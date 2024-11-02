import pandas as pd
import gensim
import numpy as np
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonfiy

app = Flask(__name__)

# FastText 한국어 모델 로드
model = gensim.models.KeyedVectors.load("cc.ko.300.kv")  # 미리 저장된 KeyedVectors 모델 사용

# CSV 파일 경로
csv_file_path = "caferec.csv"

# 카페 데이터 읽기
df = pd.read_csv(csv_file_path)

# 형태소 분석기 초기화
okt = Okt()


# FastText를 사용한 단어 유사도 계산 함수
def word_similarity(word1, word2, threshold=0.2):
    try:
        vec1 = model[word1]  # 첫 번째 단어의 벡터
        vec2 = model[word2]  # 두 번째 단어의 벡터
        # 코사인 유사도 계산
        similarity = np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
        if similarity < threshold:
            return 0  # 일정 유사도 이하일 경우 무시
        return similarity
    except KeyError:
        return 0  # 모델에 없는 단어일 경우 0 반환


# 카페 키워드를 형태소로 분석한 후 리스트로 변환
def tokenize_keywords(cafe_keywords):
    tokens = [word for word, tag in okt.pos(cafe_keywords) if tag in ['Noun', 'Adjective']]
    return ' '.join(tokens)


# 데이터프레임에서 카페 키워드를 형태소로 변환하여 저장
cafes = []
for index, row in df.iterrows():
    cafe = {
        'name': row['카페이름'],
        'keywords': row['키워드'],
        'tokenized_keywords': tokenize_keywords(row['키워드'])
    }
    cafes.append(cafe)


# 사용자 입력을 형태소로 분석
def process_user_input(user_input):
    tokens = [word for word, tag in okt.pos(user_input) if tag in ['Noun', 'Adjective']]

    # 디버깅용 출력: 사용자 입력 분석 결과 출력
    print(f"\n[DEBUG] 사용자 입력 원문: {user_input}")
    print(f"[DEBUG] 형태소 분석 결과: {tokens}")

    return ' '.join(tokens)


# TF-IDF 기반 유사도 계산
def calculate_tfidf_similarity(user_input, cafes):
    # 모든 카페 키워드를 포함한 리스트
    documents = [cafe['tokenized_keywords'] for cafe in cafes] + [user_input]

    # TF-IDF 벡터화
    vectorizer = TfidfVectorizer().fit_transform(documents)
    vectors = vectorizer.toarray()

    # 마지막 벡터는 사용자 입력에 해당하므로, 이 벡터와 나머지 카페 키워드 벡터들 간의 유사도 계산
    user_vector = vectors[-1]
    cafe_vectors = vectors[:-1]

    # 코사인 유사도를 계산하여 반환
    similarities = cosine_similarity([user_vector], cafe_vectors)

    # 디버깅용 출력: TF-IDF 기반 유사도 출력
    print("\n[DEBUG] TF-IDF 기반 유사도 계산 결과:")
    for cafe, similarity in zip(cafes, similarities[0]):
        print(f"[DEBUG] 카페 이름: {cafe['name']} - 유사도: {similarity:.4f}")

    return similarities[0]


# FastText를 사용하여 사용자 입력과 카페 속성 간 유사도를 계산
def refine_with_fasttext(user_input_tokens, cafe_tokens):
    fasttext_score = 0
    for user_word in user_input_tokens:
        for cafe_word in cafe_tokens:
            similarity = word_similarity(user_word, cafe_word)
            fasttext_score += similarity
            # 디버깅용 출력
            print(f"[DEBUG] FastText 유사도 계산: '{user_word}'와 '{cafe_word}' -> 유사도: {similarity:.4f}")
    return fasttext_score


# TF-IDF 상위 10개의 카페에 대해 FastText로 세밀한 차이를 구분
def break_ties_with_fasttext(top_cafes, user_input_tokens):
    print("\n[DEBUG] TF-IDF 상위 10개의 카페 FastText로 구별:")
    fasttext_results = []

    for cafe, _ in top_cafes:
        fasttext_score = refine_with_fasttext(user_input_tokens, cafe['tokenized_keywords'].split())
        fasttext_results.append((cafe, fasttext_score))

    # FastText 점수를 기준으로 정렬
    sorted_fasttext_cafes = sorted(fasttext_results, key=lambda x: x[1], reverse=True)

    return sorted_fasttext_cafes


# 추천 함수
def recommend_cafes(user_input):
    # 사용자 입력을 형태소로 변환
    processed_input = process_user_input(user_input)

    # 유사도 계산 (TF-IDF)
    similarities = calculate_tfidf_similarity(processed_input, cafes)

    # 유사도를 기준으로 카페 정렬 (TF-IDF 상위 10개 추출)
    top_10_cafes = sorted(zip(cafes, similarities), key=lambda x: x[1], reverse=True)[:10]

    # 사용자 입력의 토큰 분리
    user_input_tokens = processed_input.split()

    # 상위 10개의 카페들에 대해 FastText로 구분
    top_3_cafes_with_fasttext = break_ties_with_fasttext(top_10_cafes, user_input_tokens)[:3]

    # 유사도가 높은 상위 3개의 카페 추천
    top_3_cafes = [cafe['name'] for cafe, _ in top_3_cafes_with_fasttext]

    if not top_3_cafes:
        return "해당 분위기의 카페를 찾을 수 없어요. 다른 단어로 다시 시도해 주세요!"

    return f"추천하는 카페는 다음과 같습니다: {', '.join(top_3_cafes)}"


# 사용 예시
while True:
    user_input = input("원하는 분위기를 나타내는 단어나 형용사를 입력해 주세요 (종료하려면 'exit' 입력): ")
    if user_input.lower() == "exit":
        break
    recommendations = recommend_cafes(user_input)
    print(f"\n{recommendations}\n")


# API
def recommend():
    data = request.get_json()
    user_input = data.get('message')

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    recommendations = recommend_cafes(user_input)
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
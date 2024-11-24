import pandas as pd
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from bert_score import score
import evaluate

# Load the datasets
file_path1 = 'C:/Users/Q2112/Desktop/cafe_naver_api/translated_refined_data_with_gpt.csv'
data1 = pd.read_csv(file_path1)

file_path2 = 'C:/Users/Q2112/Desktop/cafe_naver_api/model_generated_summaries_ver3.csv'
data2 = pd.read_csv(file_path2)

# Extract generated and reference summaries
generated_summaries = data1['refined_summary'].tolist()
reference_summaries = data2['generated_summary'].tolist()

# 1. ROUGE Evaluation
rouge = evaluate.load("rouge")
rouge_results = rouge.compute(predictions=generated_summaries, references=reference_summaries)

# Access ROUGE scores
rouge1_score = rouge_results["rouge1"]
rouge2_score = rouge_results["rouge2"]
rougeL_score = rouge_results["rougeL"]

# 2. BLEU Evaluation with Smoothing
smoothing = SmoothingFunction()
bleu_scores = [
    sentence_bleu([ref.split()], gen.split(), smoothing_function=smoothing.method1)
    for ref, gen in zip(reference_summaries, generated_summaries)
]
average_bleu = sum(bleu_scores) / len(bleu_scores)

# 3. BERTScore Evaluation
P, R, F1 = score(generated_summaries, reference_summaries, lang="ko")  # Use "ko" for Korean

# Prepare evaluation results
evaluation_results = {
    "ROUGE-1": rouge1_score,
    "ROUGE-2": rouge2_score,
    "ROUGE-L": rougeL_score,
    "Average BLEU": average_bleu,
    "BERTScore Precision": P.mean().item(),
    "BERTScore Recall": R.mean().item(),
    "BERTScore F1": F1.mean().item(),
}

# Save evaluation results to CSV
evaluation_results_df = pd.DataFrame([evaluation_results])
evaluation_results_df.to_csv("evaluation_results.csv", index=False, encoding='utf-8-sig')
print(evaluation_results_df)

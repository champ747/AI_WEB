from transformers import BartForConditionalGeneration, PreTrainedTokenizerFast, Trainer, TrainingArguments
import pandas as pd
from sklearn.model_selection import train_test_split

# 데이터 로드
file_path = "C:/Users/Q2112/Desktop/cafe_naver_api/translated_refined_data_with_gpt.csv"
data = pd.read_csv(file_path)

# 데이터 준비
data = data.dropna(subset=['Full Content', 'refined_summary'])  # 결측치 제거
train_texts, val_texts, train_summaries, val_summaries = train_test_split(
    data['Full Content'].tolist(),
    data['refined_summary'].tolist(),
    test_size=0.2,
    random_state=42
)

# KoBART 모델 및 토크나이저 로드
model_name = "EbanLee/kobart-summary-v3"
model = BartForConditionalGeneration.from_pretrained(model_name)
tokenizer = PreTrainedTokenizerFast.from_pretrained(model_name)

# 토크나이징
train_encodings = tokenizer(train_texts, truncation=True, padding=True, max_length=512)
val_encodings = tokenizer(val_texts, truncation=True, padding=True, max_length=512)

train_labels = tokenizer(train_summaries, truncation=True, padding=True, max_length=128)
val_labels = tokenizer(val_summaries, truncation=True, padding=True, max_length=128)

# 데이터셋 클래스
import torch

class ReviewDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels['input_ids'][idx])
        return item

train_dataset = ReviewDataset(train_encodings, train_labels)
val_dataset = ReviewDataset(val_encodings, val_labels)

# 학습 설정
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=10,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
)

# 모델 학습
trainer.train()

# 모델 저장
model.save_pretrained("./custom_kobart_summary_ver3")
tokenizer.save_pretrained("./custom_kobart_summary_ver3")


---

# Team 47 – Leveraging Operational and Environmental Data for Train Delay Prediction via Deep Learning Models


## Team Info

 — **Rama Krishna Eluri** 
  *Work Done: Model architecture design, DNN & CNN implementation*

* 22471A05N0 — **Kotha Lahari** 
  *Work Done: Data preprocessing, LSTM & BiLSTM implementation, Result analysis*

* 22471A05L2 — **Appala Chandana Priya** 
  *Work Done: Dataset preparation, Feature engineering, EDA*

* 23475A0502 — **Yarroju Rekha Sri** 
  *Work Done: Performance evaluation, Visualization, Documentation*

---

## Abstract

This project focuses on predicting train delays using deep learning techniques applied to operational and environmental railway data. The dataset includes features such as station-to-station distance, weather conditions, day of the week, time slots, train type, congestion levels, and historical delays. Four deep learning models—DNN, CNN, LSTM, and BiLSTM—were implemented and compared under uniform experimental conditions. The models were evaluated using RMSE, MAE, R², and sMAPE metrics. Experimental results show that the BiLSTM model achieved the highest accuracy, effectively capturing bidirectional temporal dependencies in delay sequences. The proposed framework demonstrates strong potential for real-time railway delay forecasting and intelligent transportation system integration.

---

## Paper Reference (Inspiration)

👉 **[Leveraging Operational and Environmental Data for Train Delay Prediction via Deep Learning Models
– Rama Krishna Eluri, Kotha Lahari, Appala Chandana Priya, Yarroju Rekha Sri, Dharmapuri Siri, Kandukuri Swarnalatha]**
Original IEEE-style research paper used as inspiration for the model.

---

## Our Improvement Over Existing Paper

* Implemented uniform comparison of four deep learning architectures under identical preprocessing conditions.
* Included comprehensive evaluation metrics (RMSE, MAE, R², sMAPE, CPU time).
* Enhanced feature preprocessing with normalization and time transformation.
* Conducted detailed analysis of computational efficiency.
* Structured modular architecture for possible real-time deployment.

---

## About the Project

### What the Project Does

It predicts train delays (in minutes) using deep learning models trained on operational and environmental railway data.

### Why It Is Useful

* Improves passenger travel planning
* Assists railway authorities in proactive scheduling
* Reduces cascading delays
* Supports intelligent transport systems and smart cities

### General Workflow

Raw Data → Data Cleaning → Feature Encoding & Scaling → Train/Test Split → Model Training (DNN/CNN/LSTM/BiLSTM) → Evaluation → Delay Prediction Output

---

## Dataset Used

👉 **Railway Delay Dataset (Academic / Inspired by Indian Railways)**

**Dataset Details:**

* Distance Between Stations (km)
* Weather Conditions
* Day of the Week
* Time of Day
* Train Type
* Historical Delay (minutes)
* Route Congestion Level
* Target Variable: Delay in Minutes

Dataset split: 80% Training – 20% Testing

---

## Dependencies Used

Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Keras

---

## EDA & Preprocessing

* Removed missing and inconsistent records
* Label encoded categorical variables
* Converted time features into numerical format (minutes)
* Standardized numerical features using StandardScaler
* Analyzed feature importance
* Visualized delay distribution and correlations

---

## Model Training Info

Four models were trained using Adam optimizer and MSE loss function:

* **DNN**: Fully connected dense layers with ReLU and Dropout
* **CNN**: 1D convolutional layers with MaxPooling
* **LSTM**: Sequential modeling with memory cells
* **BiLSTM**: Bidirectional sequence learning for improved temporal understanding

Training conducted with 80:20 split and consistent hyperparameters for fair comparison.

---

## Model Testing / Evaluation

Performance Metrics Used:

* R² (Coefficient of Determination)
* MAE (Mean Absolute Error)
* RMSE (Root Mean Square Error)
* sMAPE (Symmetric Mean Absolute Percentage Error)
* CPU Training Time

---

## Results

| Model  | R² (%) | MAE   | RMSE  | sMAPE (%) | CPU Time (s) |
| ------ | ------ | ----- | ----- | --------- | ------------ |
| CNN    | 94.44  | 29.68 | 49.14 | 70.86     | 32.9         |
| LSTM   | 95.87  | 29.89 | 42.34 | 71.92     | 36.84        |
| DNN    | 95.48  | 29.40 | 44.29 | 75.92     | 32.44        |
| BiLSTM | 96.17  | 28.42 | 40.80 | 69.17     | 316.24       |

✅ **BiLSTM achieved the best performance across all evaluation metrics.**

---

## Limitations & Future Work

* High computational cost for BiLSTM
* Dataset not from official railway authority
* No real-time API integration

Future Enhancements:

* Integrate real-time weather & IoT data
* Implement Transformer-based models
* Deploy as web-based railway dashboard
* Extend to multimodal transport systems

---

## Deployment Info

Currently implemented as a research prototype using Python and TensorFlow.
Can be deployed as:

* Web application using Flask/Django
* Railway management dashboard
* Real-time API service
* Cloud deployment (AWS / Azure / GCP)

---



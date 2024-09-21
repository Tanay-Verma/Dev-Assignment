import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

#Data Cleaning
def clean_data(file_path):
    df = pd.read_csv(file_path)
    cleaned_df = df.dropna()
    cleaned_df.to_csv('cleaned_data.csv', index=False)
    return cleaned_df

#Data Manipulation
def top_5_by_age(df, column="age", threshold=30):
    return df[df[column] > threshold].nlargest(5, column)

#Data Visualization
def visualize_age_distribution(df, age_column="age"):
    plt.figure(figsize=(10, 6))
    df[age_column].hist(bins=20, edgecolor="black")
    plt.title("Distribution of User Ages")
    plt.xlabel("Age")
    plt.ylabel("Frequency")
    plt.savefig('age_distribution.png')
    plt.close()

#Descriptive Statistics
def calculate_statistics(df, column="age"):
    mean = np.mean(df[column])
    median = np.median(df[column])
    std_dev = np.std(df[column])
    return mean, median, std_dev

#Main script to run all functions
if __name__ == "__main__":
    file_path = 'data.csv'

    #Clean data
    cleaned_df = clean_data(file_path)
    print("Data cleaned and saved to 'cleaned_data.csv")

    #Get top 5 rows where age > 30
    top_5 = top_5_by_age(cleaned_df)
    print("Top 5 rows where age > 30:")
    print(top_5)

    #Visualize age distribution
    visualize_age_distribution(cleaned_df)
    print("Age distribution plat saved as 'age_distribution.png'")

    #Calculate statistics
    mean, median, std_dev = calculate_statistics(cleaned_df)
    print(f"Age statistics: Mean = {mean:.2f}, Median = {median:.2f}, Standard Deviation = {std_dev:.2f}")
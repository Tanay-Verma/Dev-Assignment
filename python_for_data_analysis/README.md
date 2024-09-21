# Python Data Analysis Project

This project demonstrates basic data analysis tasks using Python, including data cleaning, manipulation, visualization, and descriptive statistics calculation.

## Features

- Data Cleaning: Remove rows with missing values from a CSV file.
- Data Manipulation: Extract top 5 rows based on a specific column value.
- Data Visualization: Create a bar chart to visualize age distribution.
- Descriptive Statistics: Calculate mean, median, and standard deviation for a specified column.

## Prerequisites

- Python 3.6+
- pip (Python package installer)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/Tanay-Verma/Dev-Assignment.git
   cd python-data-analysis
   ```

2. Create a virtual environment:
   ```
   python -m venv data_analysis_env
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     data_analysis_env\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source data_analysis_env/bin/activate
     ```

4. Install the required packages:
   ```
   pip install pandas matplotlib numpy
   ```

## Usage

1. Ensure your CSV file is named `data.csv` and is in the project directory.

2. Run the script:
   ```
   python data_analysis.py
   ```

3. The script will perform the following actions:
   - Clean the data and save it as `cleaned_data.csv`
   - Print the top 5 rows where age > 30
   - Create and save an age distribution plot as `age_distribution.png`
   - Print age statistics (mean, median, standard deviation)

## Customization

You can modify the `data_analysis.py` script to:
- Change the input file name
- Adjust the age threshold in the `top_5_by_age` function
- Modify the column names used for analysis
- Customize the visualization parameters

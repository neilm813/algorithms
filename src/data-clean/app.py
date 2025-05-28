"""
Task:
Given a list of dictionaries representing encounter records exported from an EHR system, write a Python function to:

Normalize date formats to YYYY-MM-DD

Clean and title-case patient names

Filter out invalid encounters (e.g. missing patient ID or date)

Return a list of cleaned encounters

Next, read the encounter records from a CSV file, apply the cleaning function, and output the cleaned encounters to a new CSV file.
"""

import csv
import os
from datetime import datetime
from pprint import pprint


# encounters = [
#     {"patient_id": "123", "name": "jane DOE", "date_of_visit": "03/21/2024", "reason": "Checkup"},
#     {"patient_id": "", "name": "john smith", "date_of_visit": "2024-04-10", "reason": "Follow-up"},
#     {"patient_id": "456", "name": "alice Johnson", "date_of_visit": "April 5, 2024", "reason": "Annual Physical"},
# ]

# Expected output
output = [
    {"patient_id": "123", "name": "Jae Doe", "date_of_visit": "2024-03-21", "reason": "Checkup"},
    {"patient_id": "456", "name": "Alice Johnson", "date_of_visit": "2024-04-05", "reason": "Annual Physical"},
]

def normalize_date(date_str: str) -> str:
    for format in ("%m/%d/%Y", "%Y-%m-%d", "%B %d, %Y"):
        try:
            return datetime.strptime(date_str, format).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None

def case_patient_name(name: str) -> str:
    return name.title()

def remove_invalid_encounters(encounters):
    return [encounter for encounter in encounters if encounter.get("patient_id") and encounter.get("date_of_visit")]

def read_csv_encounters(filepath="data/encounters.csv"):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"The file {filepath} does not exist.")
    
    if os.stat(filepath).st_size == 0:
        return []
    
    encounters = []

    with open(filepath, mode='r', newline='') as file:
        reader = csv.DictReader(file)

        for row in reader:
            encounters.append(row)

    return encounters


def clean_encounters(encounters):
    filtered_encounters = remove_invalid_encounters(encounters)
    cleaned_encounters = []

    for encounter in filtered_encounters:

        normalized_date = normalize_date(encounter["date_of_visit"])
        cased_name = case_patient_name(encounter["name"])

        # Clone the encounter and update fields
        cleaned_encounters.append({
            **encounter,
            "date_of_visit": normalized_date if normalized_date else encounter["date_of_visit"],
            "name": cased_name
        })
    
    return cleaned_encounters

def output_to_csv(encounters, filename="cleaned_encounters.csv"):
    if not encounters or len(encounters) == 0:
        return None
    
    os.makedirs("data", exist_ok=True)
    
    with open(f"data/{filename}", mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=encounters[0].keys())
        writer.writeheader()

        for encounter in encounters:
            writer.writerow(encounter)

encounters = read_csv_encounters()
print('Read encounters from CSV:')
pprint(encounters)
output_to_csv(clean_encounters(encounters))
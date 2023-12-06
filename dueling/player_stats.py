
import requests, json
api_url = "http://10.60.91.50:3000/api?id=testId"
response = requests.get(api_url)

player1_stats = json.loads(response.text)



api_url = "http://10.60.91.50:3000/api?id=buffId"
response = requests.get(api_url)

player2_stats =  json.loads(response.text)
# Compare strength
if player1_stats["strength"] > player2_stats["strength"]:
    print("Player 1 has more strength.")
elif player1_stats["strength"] < player2_stats["strength"]:
    print("Player 2 has more strength.")
else:
    print("Both players have the same strength.")

# Compare luck
if player1_stats["luck"] > player2_stats["luck"]:
    print("Player 1 is luckier.")
elif player1_stats["luck"] < player2_stats["luck"]:
    print("Player 2 is luckier.")
else:
    print("Both players have the same luck.")

# Compare perception
if player1_stats["perception"] > player2_stats["perception"]:
    print("Player 1 has better perception.")
elif player1_stats["perception"] < player2_stats["perception"]:
    print("Player 2 has better perception.")
else:
    print("Both players have the same perception.")

# Compare charisma
if player1_stats["charisma"] > player2_stats["charisma"]:
    print("Player 1 has more charisma.")
elif player1_stats["charisma"] < player2_stats["charisma"]:
    print("Player 2 has more charisma.")
else:
    print("Both players have the same charisma.")

# Compare intelligence
if player1_stats["intelligence"] > player2_stats["intelligence"]:
    print("Player 1 has higher intelligence.")
elif player1_stats["intelligence"] < player2_stats["intelligence"]:
    print("Player 2 has higher intelligence.")
else:
    print("Both players have the same intelligence.")

# Compare agility
if player1_stats["agility"] > player2_stats["agility"]:
    print("Player 1 has higher agility.")
elif player1_stats["agility"] < player2_stats["agility"]:
    print("Player 2 has higher agility.")
else:
    print("Both players have the same agility.")

# Compare endurance
if player1_stats["endurance"] > player2_stats["endurance"]:
    print("Player 1 has higher endurance.")
elif player1_stats["endurance"] < player2_stats["endurance"]:
    print("Player 2 has higher endurance.")
else:
    print("Both players have the same endurance.")
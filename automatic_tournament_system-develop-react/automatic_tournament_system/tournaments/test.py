import math
import json

def single_el_number_of_rounds(participants):
    return math.ceil(math.log2(len(participants)))


def single_el_number_of_matches(participants):
    return 2 ** single_el_number_of_rounds(participants) - 1


class newNode:
	def __init__(self, data, parent):
		self.data = data
		self.parent = parent
		self.left = self.right = None
       
class Tree:
    def __init__(self, participants):
        self.participants = participants
        self.root = None
        self.bracket = []

    def single_el_number_of_rounds(self):
        return math.ceil(math.log2(len(self.participants)))


    def single_el_number_of_matches(self):
        return 2 ** single_el_number_of_rounds(self.participants) - 1
    
    def insertLevelOrder(self, arr, i, n, parent):
        root = None
        # Base case for recursion
        if i < n:
            root = newNode(arr[i], parent)

            # insert left child
            root.left = self.insertLevelOrder(arr, 2 * i + 1, n, i)

            # insert right child
            root.right =self.insertLevelOrder(arr, 2 * i + 2, n, i)
            
        return root


    def inOrder(self, root):
        if root != None:
            self.inOrder(root.left)

            if root.left == None:
                if len(self.participants) >= 2:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": "null"
                        },
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": "null"
                        },
                    ]
                    })
                elif len(self.participants) == 1:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": "null"
                        }
                    ]
                    })
                else:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": []
                    })             
            else:
                self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": []
                    })
            self.inOrder(root.right)

    def create_bracket(self):
        arr = range(single_el_number_of_matches(self.participants))
        root = self.insertLevelOrder(arr, 0, len(arr), None)
        self.inOrder(root)
        return json.dumps(self.bracket)

class RoundRobin:

    def __init__(self, participants):
        self.participants = participants
        self.bracket = []

    def create_round_robin_bracket(self):  
        round_robin_bracket = []
        if len(self.participants) % 2 == 1: self.participants = self.participants + [None]
        n = len(self.participants)
        map = list(range(n))
        mid = n // 2
        for i in range(n-1):
            l1 = map[:mid]
            l2 = map[mid:]
            l2.reverse()
            round = []
            for j in range(mid):
                t1 = self.participants[l1[j]]
                t2 = self.participants[l2[j]]
                if j == 0 and i % 2 == 1:
                    round.append({
                    "id": j,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t2}",
                        "picture": None
                        },
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t1}",
                        "picture": None
                        },
                    ]
                    })
                else:
                    round.append({
                    "id": j,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t1}",
                        "picture": None
                        },
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t2}",
                        "picture": None
                        },
                    ]
                    })
            round_robin_bracket.append(round)
            map = map[mid:-1] + map[:mid] + map[-1:]

        return round_robin_bracket


# a = Tree(['as', 'ad', 'af', 'ada', 'da'])
# a.create_bracket()

# b = RoundRobin(["Lions", "Tigers", "Bears", "Dorothy"])
# print(b.create_round_robin_bracket())
    
lang = "Java"

match lang:
    case "JavaScript":
        print("You can become a web developer.")

    case "Python":
        print("You can become a Data Scientist")

    case "PHP":
        print("You can become a backend developer")
    
    case "Solidity":
        print("You can become a Blockchain developer")

    case "Java":
        print("You can become a mobile app developer")
    case _:
        print("The language doesn't matter, what matters is solving problems.")

    
    





[{"id": 0, "nextMatchId": null, "tournamentRoundText": "test", "start Time": "2021-05-30", "state": "SCHEDULED", "participants": []},
 {"id": 1, "nextMatchId": 0, "tournamentRoundText": "test", "startTime": "2021-05-30", "state": "SCHEDULED", "participants": [{"id": "d1", "resultText": 0, "isWinner": false, "status": null, "name": "d4", "picture": null}, {"id": "d1", "resultText": 0, "isWinner": false, "status": null, "name": "c3", "picture": null}]},
  {"id": 2, "nextMatchId": 0, "tournamentRoundText": "test", "startTime": "2021-05-30", "state": "SCHEDULED", "participants": [{"id": "d1", "resultText": 0, "isWinner": false, "status": null, "name": "b2", "picture": null},{"id": "d1", "resultText": 0, "isWinner": false, "status": null, "name": "a1", "picture": null}]}, {"owner": "admin"}]
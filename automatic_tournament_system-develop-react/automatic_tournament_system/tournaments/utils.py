import re
import math
import secrets


def clear_participants(participants):
    return [i.strip() for i in re.split(r'[\n\r]+', participants)]


class newNode:
	def __init__(self, data, parent):
		self.data = data
		self.parent = parent
		self.left = self.right = None
       
class SingleElimination:
    def __init__(self, participants):
        self.participants = participants
        self.root = None
        self.bracket = []

    def single_el_number_of_rounds(self):
        return math.ceil(math.log2(len(self.participants)))


    def single_el_number_of_matches(self):
        return 2 ** self.single_el_number_of_rounds() - 1
    
    def insertLevelOrder(self, arr, i, n, parent):
        root = None
        if i < n:
            root = newNode(arr[i], parent)
            root.left = self.insertLevelOrder(arr, 2 * i + 1, n, i)
            root.right =self.insertLevelOrder(arr, 2 * i + 2, n, i)
            
        return root

    def append_participant(self, name):
        return  {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{name}",
                        "picture": None
                }

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
                        self.append_participant(self.participants.pop()),
                        self.append_participant(self.participants.pop())
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
                        self.append_participant(self.participants.pop()),
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
        arr = range(self.single_el_number_of_matches())
        root = self.insertLevelOrder(arr, 0, len(arr), None)
        self.inOrder(root)
        a = sorted(self.bracket, key=lambda match: match.get('id'))
        a.append({'owner':'admin'})
        return a
    
    def add_result(self, result):
        print(result)

# игру выйграл проиграл, серию выиграл проиграл ничья

    
class RoundRobin:

    def __init__(self, participants, points):
        self.participants = [self.append_participant(name) for name in participants]
        self.match_table = [self.append_participant_to_table(name) for name in participants]
        self.points = points

    @staticmethod
    def set_match_score(match, bracket):
        # search round
        for round in bracket.get('rounds'):
            # search match
            for index, m in enumerate(round):
                if m['id'] == match['id']:
                    first_partic_res = int(match.get('participants')[0].get('resultText')) - int(m.get('participants')[0].get('resultText'))
                    second_partic_res = int(match.get('participants')[1].get('resultText')) - int(m.get('participants')[1].get('resultText'))
                    # generators
                    first_partic = next(partic for partic in bracket.get('table') if partic['participant'] == match.get('participants')[0].get('participant'))
                    second_partic = next(partic for partic in bracket.get('table') if partic['participant'] == match.get('participants')[1].get('participant'))
                    # add match scoore to table 
                    first_partic.get('match_w_l')[0] += first_partic_res
                    first_partic.get('match_w_l')[1] += second_partic_res

                    second_partic.get('match_w_l')[0] += second_partic_res
                    second_partic.get('match_w_l')[1] += first_partic_res

                    if match.get('state') == "PLAYED" and m.get('state') == 'SCHEDULED':
                        match['state'] = "PLAYED"
                        if first_partic_res > second_partic_res:
                            # add res in table
                            first_partic['win'] += 1
                            second_partic['loose'] += 1
                        elif second_partic_res < first_partic_res:
                             # add res in table
                            second_partic['win'] += 1
                            first_partic['loose'] += 1
                        else:
                            second_partic['draw'] += 1
                            first_partic['draw'] += 1
                    elif match.get('state') == "SCHEDULED" and m.get('state') == 'PLAYED':
                        match['state'] = "SCHEDULED"
                        if  m.get('participants')[0]['isWinner'] == True:
                            # add res in table
                            first_partic['win'] -= 1
                            second_partic['loose'] -= 1
                        elif m.get('participants')[1]['isWinner'] == True:
                             # add res in table
                            second_partic['win'] -= 1
                            first_partic['loose'] -= 1
                        else:
                            second_partic['draw'] -= 1
                            first_partic['draw'] -= 1
                    elif match.get('state') == "PLAYED" and m.get('state') == 'PLAYED':
                          # d -> 1
                        if m.get('participants')[0]['isWinner'] == False and \
                            m.get('participants')[1]['isWinner'] == False and match.get('participants')[0]['isWinner']==True:
                            first_partic['win'] += 1
                            first_partic['draw'] -= 1
                            second_partic['draw'] -= 1
                        # d -> 2
                        elif m.get('participants')[0]['isWinner'] == False and \
                            m.get('participants')[1]['isWinner'] == False and match.get('participants')[1]['isWinner']==True:
                            second_partic['win'] += 1
                            second_partic['draw'] -= 1
                            first_partic['draw'] -= 1
                        # 2 -> 1
                        elif match.get('participants')[0]['isWinner'] == True and m.get('participants')[0]['isWinner']==False:
                            first_partic['win'] += 1
                            first_partic['loose'] -= 1
                            second_partic['loose'] += 1
                            second_partic['win'] -= 1
                        # 1 -> 2
                        elif match.get('participants')[1]['isWinner'] == True and m.get('participants')[1]['isWinner']==False:
                            second_partic['win'] += 1
                            second_partic['loose'] -= 1
                            first_partic['loose'] += 1
                            first_partic['win'] -= 1
                        # 1 -> d
                        elif match.get('participants')[0]['isWinner'] == False and \
                            match.get('participants')[1]['isWinner'] == False and m.get('participants')[0]['isWinner']==True:
                            first_partic['win'] -= 1
                            first_partic['draw'] += 1
                            second_partic['draw'] += 1
                            second_partic['loose'] -= 1
                         # 2 -> d
                        elif match.get('participants')[0]['isWinner'] == False and \
                            match.get('participants')[1]['isWinner'] == False and m.get('participants')[1]['isWinner']==True:
                            second_partic['win'] -= 1
                            second_partic['draw'] += 1
                            first_partic['draw'] += 1
                            first_partic['loose'] -= 1

                    # get score from table
                    win_scoore = bracket.get('points').get('win')
                    loos_scoore = bracket.get('points').get('loss')
                    draw_scoore = bracket.get('points').get('draw')

                    # calc for participants
                    first_partic['scores'] = first_partic['draw']*draw_scoore + first_partic['win']*win_scoore + first_partic['loose']*loos_scoore
                    second_partic['scores'] = second_partic['draw']*draw_scoore + second_partic['win']*win_scoore + second_partic['loose']*loos_scoore
                   
                    round[index] = match
                    break
    
    

    def append_participant(self, name):
        return  {
                    'id': secrets.token_hex(16),
                    'resultText': 0,
                    'participant': f"{name}",
                    'isWinner': False
                }
    
    def append_participant_to_table(self, name):
        return  {
                    'id': secrets.token_hex(16),
                    'participant': f"{name}",
                    'match_w_l': [0, 0],
                    'draw': 0,
                    'win': 0,
                    'loose': 0,
                    'scores': 0
                }

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
                    "id": secrets.token_hex(16),
                    "startTime": "2023-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        t2,
                        t1
                    ]
                    })
                else:
                    round.append({
                    "id": secrets.token_hex(16),
                    "startTime": "2023-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        t1,
                        t2
                    ]
                    })
            round_robin_bracket.append(round)
            map = map[mid:-1] + map[:mid] + map[-1:]
            
        # return round_robin_bracket
        return {'rounds': round_robin_bracket, 'table': self.match_table, 'points': self.points}
    
    






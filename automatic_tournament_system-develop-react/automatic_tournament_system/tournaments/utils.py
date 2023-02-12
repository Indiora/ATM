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
            # search match remove index ?
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

                    print(f"current {match.get('state')}")
                    print(f"prev {m.get('state')}")
                    print(first_partic_res)
                    print(second_partic_res)
                    print(f"first {m.get('participants')[0]['isWinner']}")
                    print(f"second {m.get('participants')[1]['isWinner']}")
        
                    if match.get('state') == "PLAYED" and m.get('state') == 'SCHEDULED':
                        match['state'] = "PLAYED"
                        if first_partic_res > second_partic_res:
                            # add res in table
                            first_partic['win'] += 1
                            second_partic['loose'] += 1
                        elif second_partic_res > first_partic_res:
                             # add res in table
                            second_partic['win'] += 1
                            first_partic['loose'] += 1
                        elif second_partic_res == 0 and first_partic_res == 0:
                            if int(match.get('participants')[0].get('resultText')) - int(match.get('participants')[1].get('resultText')) < 0:
                                second_partic['win'] += 1
                                first_partic['loose'] += 1
                            elif int(match.get('participants')[0].get('resultText')) - int(match.get('participants')[1].get('resultText')) > 0:
                                first_partic['win'] += 1
                                second_partic['loose'] += 1
                            else:
                                second_partic['draw'] += 1
                                first_partic['draw'] += 1
                        else:
                            second_partic['draw'] += 1
                            first_partic['draw'] += 1
                            # test
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
                            second_partic['loose'] += 1
                        # d -> 2
                        elif m.get('participants')[0]['isWinner'] == False and \
                            m.get('participants')[1]['isWinner'] == False and match.get('participants')[1]['isWinner']==True:
                            second_partic['win'] += 1
                            second_partic['draw'] -= 1
                            first_partic['draw'] -= 1
                            first_partic['loose'] += 1
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
                    # leave function
                    return
    
    

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
        odd = True
        if len(self.participants) % 2 == 1: 
            self.participants = self.participants + [self.append_participant('None')] 
        else: 
            odd=False
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
        if odd:
            for i in round_robin_bracket:
                i.pop(0)
        return {'rounds': round_robin_bracket, 'table': self.match_table, 'points': self.points}
    

class SingleEl:

    def __init__(self, participants, second_final=False) -> None:
        self.participants = [self.append_participant(name) for name in participants]
        self.second_final = second_final
        self.length = len(participants)

    def single_el_number_of_rounds(self) -> int:
        return math.ceil(math.log2(len(self.participants)))

    def append_participant(self, name) -> dict:
        return  {
                    'id': secrets.token_hex(16),
                    'participant': f"{name}",
                    'score': 0
                }

    def get_participant(self) -> dict:
        if self.participants:
            return self.participants.pop()
        return self.append_participant('---')

    def get_match(self, full=True) -> dict:
        if full:
            second_participant = self.get_participant()
        else:
            second_participant = self.append_participant('---')
        return  {
                'id': secrets.token_hex(16),
                "startTime": "2023-02-11T11:01",
                "state": "SCHEDULED",
                'teams': [
                    self.get_participant(),
                    second_participant
                ]
            }
        
    @staticmethod
    def set_match_score(current_match, bracket):
        for r_index, round in enumerate(bracket):
            # search match
            for m_index, prev_match in enumerate(round['seeds']):
                if prev_match.get('id') == current_match.get('id'):
                    round['seeds'][m_index] = current_match
                    # P -> S
                    if prev_match.get('state')  == "PLAYED" and current_match.get('state')  == "SCHEDULED":
                        cur_i = m_index
                        for i in range(r_index, len(bracket)-1):
                            if cur_i % 2 == 0:
                                cur_i = cur_i - (cur_i // 2) 
                                team_index = 0
                            else:
                                cur_i = cur_i - (cur_i // 2) - 1
                                team_index = 1
                            bracket[i+1]['seeds'][cur_i]['state'] = "SCHEDULED"
                            bracket[i+1]['seeds'][cur_i]['teams'][team_index]['participant']  = "---"
                            bracket[i+1]['seeds'][cur_i]['teams'][team_index]['score']  = 0
                            bracket[i+1]['seeds'][cur_i]['teams'][team_index]['id'] = secrets.token_hex(16)
                    # P -> P
                    elif prev_match.get('state')  == "PLAYED" and current_match.get('state')  == "PLAYED":
                        current_winner =  1 if int(current_match['teams'][0]['score']) < int(current_match['teams'][1]['score'])  else 0
                        prev_winner = 1 if int(prev_match['teams'][0]['score']) < int(prev_match['teams'][1]['score'])  else 0
                        if current_winner != prev_winner:
                            # rollback
                            cur_i = m_index
                            for i in range(r_index, len(bracket)-1):
                                if cur_i % 2 == 0:
                                    cur_i = cur_i - (cur_i // 2) 
                                    team_index = 0
                                else:
                                    cur_i = cur_i - (cur_i // 2) - 1
                                    team_index = 1
                                bracket[i+1]['seeds'][cur_i]['state'] = "SCHEDULED"
                                bracket[i+1]['seeds'][cur_i]['teams'][team_index]['participant']  = "---"
                                bracket[i+1]['seeds'][cur_i]['teams'][team_index]['score']  = 0
                                bracket[i+1]['seeds'][cur_i]['teams'][team_index]['id'] = secrets.token_hex(16)
                            # forward
                            if bracket[r_index] != bracket[-1] and len(bracket[r_index]['seeds']) != len(bracket[-1]['seeds']):
                                if m_index % 2 == 0:
                                    match_index =  m_index - (m_index // 2)
                                    team_index = 0
                                else:
                                    match_index = m_index - (m_index // 2) - 1
                                    team_index = 1
                                # check for second final
                                if len(bracket[r_index+1]['seeds']) == len(bracket[r_index+2]['seeds']):
                                    bracket[r_index+2]['seeds'][match_index]['teams'][team_index]['participant'] = current_match['teams'][current_winner-1]['participant']
                                    bracket[r_index+2]['seeds'][match_index]['teams'][team_index]['id'] = current_match['teams'][current_winner-1]['id']

                                bracket[r_index+1]['seeds'][match_index]['teams'][team_index]['participant'] = current_match['teams'][current_winner]['participant']
                                bracket[r_index+1]['seeds'][match_index]['teams'][team_index]['id'] = current_match['teams'][current_winner]['id']
                    # S -> P
                    elif prev_match.get('state')  == "SCHEDULED" and current_match.get('state')  == "PLAYED": 
                       
                        winner =  1 if int(current_match['teams'][0]['score']) < int(current_match['teams'][1]['score'])  else 0
                        if bracket[r_index] != bracket[-1] and len(bracket[r_index]['seeds']) != len(bracket[-1]['seeds']):
                            print('vovk')
                            if m_index % 2 == 0:
                                match_index =  m_index - (m_index // 2)
                                team_index = 0
                            else:
                                match_index = m_index - (m_index // 2) - 1
                                team_index = 1

                            if len(bracket[r_index+1]['seeds']) == len(bracket[r_index+2]['seeds']):
                                bracket[r_index+2]['seeds'][match_index]['teams'][team_index]['participant'] = current_match['teams'][winner-1]['participant']
                                bracket[r_index+2]['seeds'][match_index]['teams'][team_index]['id'] = current_match['teams'][winner-1]['id']

                            bracket[r_index+1]['seeds'][match_index]['teams'][team_index]['participant'] = current_match['teams'][winner]['participant']
                            bracket[r_index+1]['seeds'][match_index]['teams'][team_index]['id'] = current_match['teams'][winner]['id']
                    # leave function
                    return


    def create_se_bracket(self) -> list:
        rounds = []
        nummber_of_rounds = self.single_el_number_of_rounds()
        number_of_match = 2**nummber_of_rounds
        print(f'nummber_of_rounds {nummber_of_rounds}')
        print(f'number_of_match {number_of_match}')
        # if not power of two
        if 2**nummber_of_rounds != self.length:
            number_of_match = 2**(nummber_of_rounds-1)
            print(f'additional rounds {self.length - 2**(nummber_of_rounds - 1)}')
           
            full_first = self.length - 2**(nummber_of_rounds - 1)
            
            with_one_first = self.length - 2**(nummber_of_rounds - 1)
            print(f'full rounds {full_first}')

            # create firs round
            first_round = {'title': 0, 'seeds': []}
            for j in range(int(number_of_match)):
                if full_first > 0:
                    first_round.get('seeds').append(self.get_match())
                    full_first -= 1
                    
                else:
                    first_round.get('seeds').append(self.get_match(full=False))
            rounds.append(first_round)
  
            full_second =  self.length - 2**(nummber_of_rounds - 2)
          
            # create second round
            second_round = {'title': 1, 'seeds': []}
            for j in range(int(number_of_match / 2 )):
                second_round.get('seeds').append(self.get_match())
                 
            rounds.append(second_round)
          
            if nummber_of_rounds > 2:
                for i in range(2, nummber_of_rounds):
                    round = {'title': i+1, 'seeds': []}
                    for j in range(int(number_of_match / 2**i )):
                        round.get('seeds').append(self.get_match())
                    rounds.append(round)
        else:
            for i in range(1, nummber_of_rounds+1):
                round = {'title': i, 'seeds': []}
                for j in range(int(number_of_match / 2**i )):
                    round.get('seeds').append(self.get_match())
                rounds.append(round)
        # add second final
        if self.second_final:
            rounds.append({'title': 'Final for 3 place', 'seeds': [self.get_match()]})
        return rounds


class DoubleEl:

    def __init__(self, participants) -> None:
        self.participants = [self.append_participant(name) for name in participants]
        self.length = len(participants)

    def single_el_number_of_rounds(self) -> int:
        return math.ceil(math.log2(len(self.participants)))

    def append_participant(self, name) -> dict:
        return  {
                    'id': secrets.token_hex(16),
                    'participant': f"{name}",
                    'score': 0
                }

    def get_participant(self) -> dict:
        if self.participants:
            return self.participants.pop()
        return self.append_participant('---')

    def get_match(self, full=True) -> dict:
        if full:
            second_participant = self.get_participant()
        else:
            second_participant = self.append_participant('---')
        return  {
                'id': secrets.token_hex(16),
                "startTime": "2023-02-11T11:01",
                "state": "SCHEDULED",
                'teams': [
                    self.get_participant(),
                    second_participant
                ]
            }

    def create_se_bracket(self) -> list:
        upper_rounds = []
        lower_rounds = []
        nummber_of_rounds = self.single_el_number_of_rounds()
        number_of_match = 2**nummber_of_rounds
        print(f'nummber_of_rounds {nummber_of_rounds}')
        print(f'number_of_match {number_of_match}')
        # if not power of two
        if 2**nummber_of_rounds != self.length:
            number_of_match = 2**(nummber_of_rounds-1)
            full_first = self.length - 2**(nummber_of_rounds - 1)
    
            # create firs round
            first_round = {'title': 0, 'seeds': []}
            for j in range(int(number_of_match)):
                if full_first > 0:
                    first_round.get('seeds').append(self.get_match())
                    full_first -= 1
                else:
                    first_round.get('seeds').append(self.get_match(full=False))
            upper_rounds.append(first_round)
          
            # create second round
            second_round = {'title': 1, 'seeds': []}
            for j in range(int(number_of_match / 2 )):
                second_round.get('seeds').append(self.get_match())
                 
            upper_rounds.append(second_round)
          
            if nummber_of_rounds > 2:
                for i in range(2, nummber_of_rounds):
                    round = {'title': i+1, 'seeds': []}
                    for j in range(int(number_of_match / 2**i )):
                        round.get('seeds').append(self.get_match())
                    upper_rounds.append(round)
        else:
            for i in range(1, nummber_of_rounds+1):
                round = {'title': i, 'seeds': []}
                for j in range(int(number_of_match / 2**i )):
                    round.get('seeds').append(self.get_match())
                upper_rounds.append(round)

        upper_rounds.append({'title': 'Final for 3 place', 'seeds': [self.get_match()]})

        # first lower round
       
        #create lower
        for i in range(2, nummber_of_rounds+1):
            round = {'title': i, 'seeds': []}
            for j in range(int(2**nummber_of_rounds / 2**i)):
                print(f"int(number_of_match / 2**i) {int(number_of_match / 2**i)}")
                round.get('seeds').append(self.get_match())
            lower_rounds.append(round)
        
        lower_rounds.insert(0, {'title': "f", 'seeds': [self.get_match() for j in range(int(2**nummber_of_rounds / 4))]})

        
        return {'upper_rounds': upper_rounds, 'lower_rounds': lower_rounds}

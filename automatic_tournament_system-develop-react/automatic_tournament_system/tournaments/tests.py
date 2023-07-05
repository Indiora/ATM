# from django.test import TestCase
import unittest
import time
# from .utils import RoundRobin, SingleEl, DoubleEl, Swiss, MultiStage, clear_participants
import datetime
import re
import math
import secrets
import datetime


class RoundRobin:

    def __init__(self, participants: list, points: dict, time_managment: dict={}) -> None:
        self.participants = [self.append_participant(name) for name in participants]
        self.match_table = [self.append_participant_to_table(name) for name in participants]
        self.points = points
        self.time_managment = time_managment

    def append_participant(self, name: str) -> dict:
        return  {
                    'id': secrets.token_hex(16),
                    'score': 0,
                    'participant': f"{name}",
                    'isWinner': False
                }
    
    def append_participant_to_table(self, name: str) -> dict:
        return  {
                    'id': secrets.token_hex(16),
                    'participant': f"{name}",
                    'match_w_l': [0, 0],
                    'draw': 0,
                    'win': 0,
                    'loose': 0,
                    'scores': 0,
                    'berger': 0
                }

    def create_round_robin_bracket(self) -> dict:  
        round_robin_bracket = []
        # всегда дополняем до четного
        if len(self.participants) % 2 == 1: 
            self.participants = self.participants + [self.append_participant('None')] 
            # смешаем начало на 1
            start = 1 
            # if len(self.participants) // 2 != 1 else 0
        else:   
            start = 0

        n = len(self.participants)
        # permutations ?
        permutations = list(range(n))
        mid = n // 2 
       
        # O(n)
        for i in range(n-1):
            l1 = permutations[:mid]
            l2 = permutations[mid:]
            l2.reverse()
            round = []
            # O(n/2)
            for j in range(start, mid):
                t1 = self.participants[l1[j]]
                t2 = self.participants[l2[j]]
                if j == 0 and i % 2 == 1:
                    round.append({
                    "id": secrets.token_hex(16),
                    "startTime": f"{self.time_managment.get('start_time')}",
                    "state": "SCHEDULED",
                    "participants": [
                        t2,
                        t1
                    ]
                    })
                else:
                    round.append({
                    "id": secrets.token_hex(16),
                    "startTime": f"{self.time_managment.get('start_time')}",
                    "state": "SCHEDULED",
                    "participants": [
                        t1,
                        t2
                    ]
                    })
            round_robin_bracket.append(round)
            permutations = permutations[mid:-1] + permutations[:mid] + permutations[-1:]

        # Time managment
        if self.time_managment.get('time_managment'):
            last_time = self.time_managment.get('start_time')
            for counter, round in enumerate(round_robin_bracket):
                if counter == 0:
                    for i in range(self.time_managment.get('mathes_same_time'), len(round), self.time_managment.get('mathes_same_time')):
                        for game in round[i:i+self.time_managment.get('mathes_same_time')]:
                            game['startTime'] = f"{last_time + datetime.timedelta(minutes=self.time_managment.get('avg_game_time')*self.time_managment.get('max_games_number'))}"
                        last_time = last_time + datetime.timedelta(minutes=self.time_managment.get('avg_game_time')*self.time_managment.get('max_games_number'))
                else:
                     for i in range(0, len(round), self.time_managment.get('mathes_same_time')):
                        for game in round[i:i+self.time_managment.get('mathes_same_time')]:
                            game['startTime'] = f"{last_time + datetime.timedelta(minutes=self.time_managment.get('avg_game_time')*self.time_managment.get('max_games_number'))}"
                        last_time = last_time + datetime.timedelta(minutes=self.time_managment.get('avg_game_time')*self.time_managment.get('max_games_number'))
                last_time = last_time + datetime.timedelta(minutes=self.time_managment.get('break_between'))
     
        return {'rounds': round_robin_bracket, 'table': self.match_table, 'points': self.points}

start = time.time()

single_el = RoundRobin(['86e9', '6a7a', '7697', '822d', '9780', 'e64a', '8ba8', '8a11', '8b25', '2976', '4d8b', 'ddc9', '799f', '48d3', 'aea0', '2c5d', '13d6', 'a4a0', '236f', 'dc9d', 'bb6d', '414e', 'f61f', '0c85', '02b4', 'eb3c', '2205', 'a476', '0748', '8ca8', '48b8', 'a246', '3d51', '414d', 'fc03', '047e', '4864', 'c22c', 'c3aa', '6cb0', '5baf', '76b7', 'fea0', '3d3a', '345a', '9d2b', '8d1c', 'f7f5', '72b7', 'fb28', 'e0e4', 'bf49', '3489', '065f', 'f1f8', '2b6c', '200f', '1aa4', 'b54f', '455b'],
                    {'time_managment': False, 'start_time': datetime.datetime(2023, 6, 5, 8, 0), 'avg_game_time': 30, 'max_games_number': 3, 'break_between': 10, 'mathes_same_time': 16}
                    )

bracket = single_el.create_round_robin_bracket()

end = time.time()

print(f"Time work {end - start}")


# q
# w
# e
# r
# t
# y
# u
# i
# o
# p
# a
# s
# d
# f
# g
# h
# j
# k
# l
# z
# x
# c
# v
# b
# n
# m
# qw
# qe
# qr
# qt
# qy
# qu
# q1
# w1
# e1
# r1
# t1
# y1
# u1
# i1
# o1
# p1
# a1
# s1
# d1
# f1
# g1
# h1
# j1
# k1
# l1
# z1
# x1
# c1
# v1
# b1
# n1
# m1
# qw1
# qe1
# qr1
# qt1
# qy1
# qu1
# q2
# w2
# e2
# r2
# t2
# y2
# u2
# i2
# o2
# p2
# a2
# s2
# d2
# f2
# g2
# h2
# j2
# k2
# l2
# z2
# x2
# c2
# v2
# b2
# n2
# m2
# qw2
# qe22
# qr2
# qt2
# qy2
# qu2
# q12
# w12
# e12
# r12
# t122
# y12
# u122
# i12
# o12
# p12
# a12
# s12
# d12
# f12
# g12
# h12
# j12
# k12
# l12
# z12
# x12
# c12
# v12
# b12
# n12
# m12
# qw12
# qe12
# qr12
# qt12
# qy12
# qu12
# q3
# w3
# e3
# r3
# t3
# y3
# u3
# i3
# o33
# p3
# a3
# s33
# d3
# f3
# g3
# h3
# j3
# k3
# l3
# z3
# x3
# c3
# v3
# b33
# n3
# m3
# qw3
# qe3
# qr3
# qt3
# qy3
# qu3
# q13
# w13
# e13
# r13
# t13
# y13
# u13
# i13
# o13
# p133
# a13
# s13
# d13
# f13
# g13
# h13
# j13
# k13
# l13
# z13
# x13
# c13
# v13
# b13
# n13
# m13
# qw13
# qe13
# qr13
# qt13
# qy13
# qu13
# q23
# w23
# e2
# r23
# t233
# y23
# u23
# i23
# o233
# p23
# a23
# s23
# d23
# f23
# g23
# h23
# j23
# k23
# l23
# z23
# x23
# c23
# v23
# b23
# n23
# m23
# qw23
# qe223
# qr23
# qt23
# qy23
# qu23
# q123
# w123
# e123
# r123
# t1223
# y123
# u1223
# i123
# o123
# p123
# a123
# s123
# d123
# f123
# g123
# h123
# j123
# k123
# l123
# z123
# x123
# c123
# v123
# b123
# n123
# m123
# qw123
# qe123
# qr123
# qt123
# qy123
# qu123
# q9
# w9
# e9
# r9
# t9
# y9
# u9
# i9
# o9
# p9
# a9
# s9
# d9
# f9
# g9
# h9
# j9
# k9
# l9
# z9
# x9
# c9
# v9
# b9
# n9
# m9
# qw9
# qe9
# qr9
# qt9
# qy9
# qu9
# q19
# w19
# e19
# r19
# t19
# y19
# u19
# i19
# o19
# p19
# a19
# s19
# d19
# f19
# g19
# h19
# j199
# k19
# l19
# z199
# x19
# c19
# v19
# b19
# n19
# m19
# qw19
# qe19
# qr19
# qt19
# qy19
# qu19
# q299
# w29
# e299
# r29
# t29
# y29
# u29
# i29
# o29
# p29
# a29
# s29
# d29
# f29
# g29
# h29
# j29
# k29
# l29
# z29
# x29
# c29
# v29
# b29
# n29
# m29
# qw29
# qe229
# qr29
# qt29
# qy29
# qu29
# q129
# w129
# e129
# r129
# t1229
# y129
# u1229
# i129
# o129
# p129
# a129
# s129
# d129
# f129
# g129
# h129
# j129
# k129
# l129
# z129
# x129
# c129
# v129
# b129
# n129
# m129
# qw129
# qe129
# qr129
# qt129
# qy129
# qu129
# q39
# w39
# e39
# r39
# t39
# y39
# u399
# i39
# o339
# p39
# a39
# s339
# d39
# f39
# g39
# h39
# j39
# k39
# l39
# z39
# x39
# c39
# v39
# b339
# n39
# m39
# qw39
# qe39
# qr39
# qt39
# qy39
# qu39
# q139
# w139
# e139
# r139
# t139
# y139
# u139
# i139
# o139
# p1339
# a139
# s139
# d139
# f139
# g139
# h139
# j139
# k1399
# l139
# z139
# x139
# c1399
# v139
# b1399
# n139
# m139
# qw139
# qe139
# qr139
# qt139
# qy139
# qu139
# q239
# w239
# e299
# r239
# t2339
# y239
# u239
# i239
# o2339
# p239
# a239
# s239
# d239
# f239
# g239
# h239
# j239
# k239
# l239
# z239
# x239
# c239
# v239
# b239
# n239
# m239
# qw239
# qe2239
# qr239
# qt239
# qy239
# qu239
# q1239
# w1239
# e1239
# r1239
# t12239
# y1239
# u12239
# i1239
# o1239
# p1239
# a1239
# s1239
# d1239
# f12399
# g1239
# h1239
# j1239
# k1239
# l1239
# z1239
# x1239
# c1239
# v1239
# b1239
# n1239
# m1239
# qw1239
# qe1239
# qr1239
# qt12399
# qy1239
# qu1239
from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from .models import Tournament, Bracket
from .serializer import TournamentSerializer, BracketSerializer, AllBracketSerealizer

from .permissions import IsTournamenOwnerOrReadOnly


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1000


class TournamentsAPIList(generics.ListCreateAPIView):
    queryset = Tournament.objects.all().order_by('id')
    serializer_class = TournamentSerializer
    pagination_class = LargeResultsSetPagination


class TournamentAPIView(generics.RetrieveAPIView): 
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    lookup_field = 'slug'


class TournamentCreateView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = (IsAuthenticated, )


class TournamentDeleteAPIView(generics.DestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = ((IsTournamenOwnerOrReadOnly|IsAdminUser),)
    lookup_field = 'slug'

    def delete(self, request, *args, **kwargs):
        print(request.user.username)
        return self.destroy(request, *args, **kwargs)


class AllBracketAPIView(generics.RetrieveAPIView): 
    queryset = Tournament.objects.all()
    serializer_class = AllBracketSerealizer
    lookup_field = 'slug'


class BracketCreateView(generics.CreateAPIView):
    queryset = Bracket.objects.all()
    serializer_class = BracketSerializer


class BracketAPIView(generics.RetrieveAPIView):
    queryset = Bracket.objects.all()
    serializer_class = BracketSerializer
    lookup_field = 'id'


class TournamentUpdateApiView(generics.UpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = ((IsTournamenOwnerOrReadOnly|IsAdminUser),)
    lookup_field = 'slug'


class BracketUpdateAPIView(generics.UpdateAPIView):
    queryset = Bracket.objects.all()
    serializer_class = BracketSerializer
    lookup_field = 'id'
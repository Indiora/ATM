from random import random

from django import forms
from .models import Tournament, Bracket
from django.utils.text import slugify
from django.forms.models import inlineformset_factory


class TournamentForm(forms.ModelForm):
    class Meta:
        model = Tournament
        fields = ('title', 'content', 'participants', 'poster', 'game', 'prize')
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control'}),
            'participants': forms.Textarea(attrs={'class': 'form-control'}),
            'game': forms.TextInput(attrs={'class': 'form-control'}),
            'prize': forms.NumberInput(attrs={'class': 'form-control'}),

        }


    # def clean_poster(self):
    #     data = self.cleaned_data['poster']
    #     print(data)
    #     return data

    # def save(self, *args, **kwargs):
    #     print()
    #     if not self.poster:
    #         self.poster = f'tournament_def_{random.randint(1, 13)}.png'
    #     super().save(*args, **kwargs)

class BracketForm(forms.ModelForm):
    class Meta:
        model = Bracket
        fields = ('type',)
        widgets = {
            'type': forms.Select(attrs={'class': 'form-control'})

        }


BracketFormset = inlineformset_factory(
    Tournament, Bracket, form=BracketForm, extra=1,
)

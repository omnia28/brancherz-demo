from django import forms

class PortfolioForm(forms.Form):
    email = forms.EmailField()
    phone = forms.CharField(max_length=20)
    agree = forms.BooleanField()

from django import forms

from .models import SignUp

class SignUpForm(forms.ModelForm):
    class Meta:
        model = SignUp
       # widgets = {
        #    'myfield': forms.TextInput(attrs={'class': 'myfieldclass'}),
        #}
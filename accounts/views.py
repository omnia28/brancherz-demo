from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth import authenticate, login
from .forms import SignupForm
from django.http import JsonResponse

# Create your views here.
# def login_view(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')

#         user = authenticate(request, username=email, password=password)

#         if user is not None:
#             login(request, user)
#             messages.success(request, "Logged in successfully!")
#             return redirect('/')
#         else:
#             messages.error(request, "Invalid email or password.")
#             return render(request, 'accounts/login.html')

#     return render(request, 'accounts/login.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful! Welcome back.')
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password. Please try again.')

    return render(request, 'accounts/login.html')

def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = form.cleaned_data['email']
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, "Account created successfully! You can now log in.")
            return JsonResponse({'success': True, 'redirect_url': reverse('home')})
        else:
            # Return JSON with errors for AJAX
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                errors = {}
                for field, error_list in form.errors.items():
                    errors[field] = error_list[0]  # first error message for each field
                return JsonResponse({'success': False, 'errors': errors})
            
            # Normal request fallback
            return render(request, 'accounts/signup.html', {'form': form})
    else:
        form = SignupForm()
    return render(request, 'accounts/signup.html', {'form': form})

def forget_password_view(request):
    return render(request, 'accounts/forgetpassword.html')

def new_password_view(request):
    return render(request, 'accounts/newpassword.html')

def code_view(request):
    return render(request, 'accounts/code.html')
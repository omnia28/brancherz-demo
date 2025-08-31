from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import PortfolioLead

# Create your views here.
def home(request):
    return render(request, 'pages/home.html')

@csrf_exempt
@require_http_methods(["POST"])
def submit_portfolio_form(request):
    try:
        # Parse JSON data
        data = json.loads(request.body.decode('utf-8'))
        
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        agree_to_marketing = data.get('agree_to_marketing', False)
        
        # Validation
        if not email:
            return JsonResponse({
                'success': False, 
                'message': 'Email is required'
            }, status=400)
        
        if not phone:
            return JsonResponse({
                'success': False, 
                'message': 'Phone number is required'
            }, status=400)
        
        # if not agree_to_marketing:
        #     return JsonResponse({
        #         'success': False, 
        #         'message': 'You must agree to receive marketing communications'
        #     }, status=400)
        
        # Create or update the lead
        lead, created = PortfolioLead.objects.get_or_create(
            email=email,
            defaults={
                'phone': phone,
                'agree_to_marketing': agree_to_marketing
            }
        )
        
        if not created:
            # Update existing lead
            lead.phone = phone
            lead.agree_to_marketing = agree_to_marketing
            lead.save()
        
        return JsonResponse({
            'success': True, 
            'message': 'Form submitted successfully! Download will start shortly.',
            'download_url': 'https://drive.usercontent.google.com/u/0/uc?id=1bF3fGo-d1_ixFlDOXENebxnEwtDaesvE&export=download'  # Add your actual download URL
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False, 
            'message': 'Invalid data format'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False, 
            'message': 'An error occurred. Please try again.'
        }, status=500)

def about(request):
    return render(request, 'pages/about.html')

def services(request):
    return render(request, 'pages/services.html')

def contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            full_name = data.get('fullName')
            email = data.get('email')
            phone = data.get('phoneNumber')
            message = data.get('message')
            
            if not all([full_name, email, message]):
                return JsonResponse({
                    'success': False, 
                    'message': 'Please fill in all required fields.'
                })
            
            subject = f"New Contact Form Submission from {full_name}"
            email_message = f"""
            New contact form submission:
            
            Name: {full_name}
            Email: {email}
            Phone: {phone}
            Message: {message}
            """
            
            send_mail(
                subject,
                email_message,
                settings.DEFAULT_FROM_EMAIL,
                ['omniamoham3@gmail.com'],
                fail_silently=False,
            )
            
            return JsonResponse({
                'success': True, 
                'message': 'Thank you for your message! We will contact you soon.'
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False, 
                'message': 'Sorry, there was an error sending your message. Please try again.'
            })
    
    return render(request, 'pages/contact.html')
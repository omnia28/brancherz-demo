from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('services', views.services, name='services'),
    path('submit-portfolio-form/', views.submit_portfolio_form, name='submit_portfolio_form'),
    # path('download-portfolio/', views.download_portfolio, name='download_portfolio'),
]

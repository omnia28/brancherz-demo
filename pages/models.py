from django.db import models

# Create your models here.
class PortfolioLead(models.Model):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    agree_to_marketing = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
# Generated by Django 2.2.3 on 2020-08-07 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metrics', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='scholardata',
            name='country',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='scholardata',
            name='website',
            field=models.CharField(max_length=100, null=True),
        ),
    ]

# Generated by Django 3.2.3 on 2021-06-11 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pomodoro', '0004_auto_20210520_1818'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='created_at',
        ),
    ]
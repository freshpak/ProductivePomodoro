from django.db import models

# User model that is used to store pomodoro completion data
class User(models.Model):
	username = models.CharField(max_length=30)
	pomodoros_completed = models.IntegerField(default=0)
	objects = models.Manager()

	def __str__(self):
		return self.username
	

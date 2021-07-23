from django.db import models

# ToDo model that is used to store ToDo items in database
class Todo(models.Model):
	title = models.CharField(max_length=120, blank=True)
	description = models.TextField(blank=True)
	completed = models.BooleanField(default=False)

	def _str_(self):
		return self.title
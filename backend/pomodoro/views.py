from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

"""
API Overview
"""
@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List' : '/user-list',
		'Detail View' : '/user-detail/<str:pk>/',
		'Create' : '/user-create',
		'Update' : '/user-update/<str:pk>/',
		'Delete' : '/user-delete/<str:pk>/',
	}
	return Response(api_urls)

@api_view(['GET'])
def userList(request):
	users = User.objects.all()
	serializer = UserSerializer(users, many = True)
	return Response(serializer.data)

@api_view(['GET'])
def userDetail(request, pk):
	user = User.objects.get(id=pk)
	serializer = UserSerializer(user, many = False)
	return Response(serializer.data)

@api_view(['POST'])
def userUpdate(request, pk):
	user = User.objects.get(id = pk)
	serializer = UserSerializer(instance=user, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def userCreate(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['DELETE'])
def userDelete(request, pk):
	user = User.objects.get(id = pk)
	user.delete()
	return Response("User deleted successfully.")









"""
First iteration generic view created (won't use)

class LeadListCreate(generics.ListCreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
"""
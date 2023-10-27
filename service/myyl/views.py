from django.shortcuts import render
import sys, os, django

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
# django.setup()
import myyl.iot


def index(request):
    # print("hi")
    # print(myyl.iot.i)
    # print("bye")
    # context = {'key': myyl.iot.i}
    context = {'text': "hello world"}
    return render(request, 'index.html')


def bus1(request):
    return render(request, 'u_bus1.html')


def bus2(request):
    return render(request, 'u_bus2.html')


def bus3(request):
    return render(request, 'u_bus3.html')


def bus4(request):
    return render(request, 'u_bus4.html')


def admin(request):
    return render(request, 'video.html')


def admin_bus1(request):
    return render(request, 'a_bus1.html')


def admin_bus2(request):
    return render(request, 'a_bus2.html')


def admin_bus3(request):
    return render(request, 'a_bus3.html')


def admin_bus4(request):
    return render(request, 'a_bus4.html')

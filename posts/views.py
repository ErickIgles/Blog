from django.shortcuts import render
from django.views.generic import TemplateView



class IndexView(TemplateView):
    template_name = 'index.html'


class DetailPostView(TemplateView):
    template_name = 'detail.html'

class UpdatePost(TemplateView):
    template_name = 'update.html'


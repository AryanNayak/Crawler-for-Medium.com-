from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from django.http import JsonResponse 
import json
from rest_framework import serializers
from rest_framework.serializers import Serializer 
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time 
import pandas as pd
from selenium.common.exceptions import NoSuchElementException        
import nltk
from nltk.corpus import wordnet
nltk.download('wordnet')


def findSimilarWord(tag):
    synonyms = []
    antonyms = []

    for syn in nltk.corpus.wordnet.synsets(tag):
        for l in syn.lemmas():
            synonyms.append(l.name())
            synonyms.append(" ")

    return synonyms


class PostView(APIView):
    def post(self, request, *args, **kwargs): 
        serializer = PostSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            tags(serializer.data['tag'].lower())
            f = open('tag.json') 
            data = json.load(f)
            print(data)
            return Response(data)

        return Response(serializer.errors)


class DisplayHistory(APIView): 
    def get(self, request, *args, **kwargs):
        history = Post.objects.all()
        serialize = PostSerializer(history, many = True)
        return Response(serialize.data)


def tags(tag):
    print(tag)
    url = 'https://medium.com/tag/'
    # tag = input()
    url = url + tag

    syn = findSimilarWord(tag) 
    print(syn)

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920x1080")
    chrome_driver = os.getcwd() +"/Users/aryannayak/.wdm/drivers/chromedriver/mac64/92.0.4515.107/chromedriver"
    # driver = webdriver.Chrome('/Users/aryannayak/.wdm/drivers/chromedriver/mac64/92.0.4515.107/chromedriver')
    driver = webdriver.Chrome(chrome_options=chrome_options, executable_path='/Users/aryannayak/.wdm/drivers/chromedriver/mac64/92.0.4515.107/chromedriver')
    # driver.add_argument('headless')
    driver.get(url)

    time.sleep(2)
    prev_h = driver.execute_script('return document.body.scrollHeight')


    blog_list = []

    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(5.6)
        divs1 = driver.find_elements_by_class_name('ae.ef')
        divs2 = driver.find_elements_by_class_name('ae.eu')

        if divs1:
            for div in divs1:
                title = div.find_element_by_tag_name('h2').text
                try:
                    details = div.find_element_by_tag_name('h3').text
                except NoSuchElementException:
                    details = ""
                author = div.find_element_by_tag_name('h4').text
                link = div.find_element_by_tag_name('a').get_attribute('href')
                blog_item = {
                    'title' : title, 
                    'details' : details, 
                    'author': author,
                    'link': link, 
                    'tags': syn
                }
                blog_list.append(blog_item) 
        else: 
            for div in divs2:
                title = div.find_element_by_tag_name('h2').text
                try:
                    details = div.find_element_by_tag_name('h3').text
                except NoSuchElementException:
                    details = ""
                author = div.find_element_by_tag_name('h4').text
                link = div.find_element_by_tag_name('a').get_attribute('href')
                blog_item = {
                    'title' : title, 
                    'details' : details, 
                    'author': author,
                    'link': link,
                    'tags': syn
                }
                blog_list.append(blog_item)  



        new_height = driver.execute_script('return document.body.scrollHeight')
        if(new_height == prev_h):
            break
        prev_h = new_height




    with open('tag.json', 'w') as outfile:
        json.dump(blog_list, outfile)




# class TestView(APIView): 
#     def get(self, request, *args, **kwargs):
#         return Response(data) 




# def test_view(request):
#     return JsonResponse(data, safe = False)


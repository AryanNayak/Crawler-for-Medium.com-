from selenium import webdriver
import time 
import pandas as pd
import json 

url = 'https://medium.com/tag/'
tag = input()
url = url + tag 

driver = webdriver.Chrome('/Users/aryannayak/.wdm/drivers/chromedriver/mac64/92.0.4515.107/chromedriver')
driver.get(url)

time.sleep(3)
prev_h = driver.execute_script('return document.body.scrollHeight')


blog_list = []

while True:
    driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    time.sleep(3)
    divs1 = driver.find_elements_by_class_name('ae.ef')
    divs2 = driver.find_elements_by_class_name('ae.eu')
    for div in divs1:
        title = div.find_element_by_tag_name('h2').text
        details = div.find_element_by_tag_name('h3').text
        author = div.find_element_by_tag_name('h4').text
        blog_item = {
            'title' : title, 
            'details' : details, 
            'author': author
        }
        blog_list.append(blog_item)  
    for div in divs2:
        title = div.find_element_by_tag_name('h2').text
        details = div.find_element_by_tag_name('h3').text
        author = div.find_element_by_tag_name('h4').text
        blog_item = {
            'title' : title, 
            'details' : details, 
            'author': author
        }
        blog_list.append(blog_item)  



    new_height = driver.execute_script('return document.body.scrollHeight')
    if(new_height == prev_h):
        break
    prev_h = new_height


# divs1 = driver.find_elements_by_class_name('ae.eu')
# divs2 = driver.find_elements_by_class_name('ae.ef') 


# for div in divs1:
#     title = div.find_element_by_tag_name('h2') 
#     blog_item = {
#         'title' : title, 
#         # 'details' : details, 
#         # 'author': author
#     }
#     blog_list.append(blog_item)   

# print(blog_list)

# df = pd.DataFrame(blog_list)

with open('tag.json', 'w') as outfile:
    json.dump(blog_list, outfile)

# print(df)


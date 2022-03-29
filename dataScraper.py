import requests
from bs4 import BeautifulSoup
import re
import numpy as np
import pandas as pd
import pickle
from datetime import datetime
import json


def extract_recipe_instruction():
    
    instructions_list=[]
    
    for i in range(0, len(schema['recipeInstructions'])):
        instructions_list.append(f"{i+1}. {schema['recipeInstructions'][i]['name']}")
    
    return instructions_list

def transform_timers(query):
    query_int = [int(s) for s in re.findall(r'\d+', query)][0]
    return f"{query_int} mins"

def set_cook_time(schema):
    try:
        cooktime = schema['cookTime']
        return transform_timers(schema['cookTime'])
    except:
        return None 

URL_LIST= [
    "https://minimalistbaker.com/abundance-kale-salad-with-savory-tahini-dressing/#wprm-recipe-container-34197",
    "https://minimalistbaker.com/creamy-mango-lassi-smoothie/#wprm-recipe-container-63441",
    "https://minimalistbaker.com/vibrant-mango-salad-with-peanut-dressing/#wprm-recipe-container-34094",
    "https://minimalistbaker.com/curried-cauliflower-grape-lentil-salad/#wprm-recipe-container-34140",
    "https://minimalistbaker.com/serrano-rosemary-guacamole/#wprm-recipe-container-54222",
    "https://minimalistbaker.com/quick-citrusy-cabbage-slaw-mayo-free/#wprm-recipe-container-66544",
    "https://minimalistbaker.com/5-ingredient-banana-egg-pancakes/#wprm-recipe-container-42840",
    "https://minimalistbaker.com/spring-buddha-bowl-with-quinoa-lemony-white-beans/",
    "https://minimalistbaker.com/easy-green-goddess-dressing-plant-based/#wprm-recipe-container-77144",
    "https://minimalistbaker.com/lentil-mushroom-stew-over-mashed-potatoes/#wprm-recipe-container-34142",
    "https://minimalistbaker.com/1-hour-vegan-shepherds-pie/#wprm-recipe-container-35763",
    "https://minimalistbaker.com/actually-crispy-baked-chickpeas/#wprm-recipe-container-34232",
    "https://minimalistbaker.com/mediterranean-baked-sweet-potatoes/#wprm-recipe-container-35807",
    "https://minimalistbaker.com/how-to-make-hummus-from-scratch/#wprm-recipe-container-34104",
    "https://minimalistbaker.com/creamy-thai-carrot-soup-with-basil/#wprm-recipe-container-35931",
    "https://minimalistbaker.com/creamy-zucchini-blueberry-smoothie/#wprm-recipe-container-34170"
]

recipes_dict = []
for url in url_list:
    try:
        r = requests.get(url=url)
        result = BeautifulSoup(r.text, 'html.parser')
        script = result.find('script').text
        my_dict = json.loads(script) 
        schema = my_dict['@graph'][7]
        r_dict = {
            "recipeName": schema['name'] ,
            "author": schema['author']['name'],
            "type": schema['recipeCategory'],
            "prepTime": transform_timers(schema['prepTime']),
            "cookTime": set_cook_time(schema),
            "nutrition": schema['nutrition']['calories'],
            "vegan": True if 'Vegan' in schema['recipeCuisine'] else False,
            "vegeterian": True if 'Vegeterian' in schema['recipeCuisine'] else False,
            "glutenFree": True if 'Gluten-Free' in schema['recipeCuisine'] else False,
            "recipeIngredients": schema['recipeIngredient'],
            "recipeInstructions": extract_recipe_instruction(),
            "image": schema['image'][0],
            "description": schema['description'],
            "serve": int(schema['recipeYield'][0]),
            "review": []
        }
        
        recipes_dict.append(r_dict)
    
    except Exception as error:
        print(url)
        print(f'error with url {error}')

json_prep = {'data':recipes_dict}

with open("recipes.json", "w") as outfile:
    json.dump(json_prep, outfile)
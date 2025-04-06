from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

import time

class HtmlScrapper:
    def __init__(self, url, elementsToClickOnInit):
        self.url = url
        self.html_code = self._read_html(elementsToClickOnInit)
        
    def _read_html(self, elementsToClickOnInit):       
        options = Options()
        options.add_argument('--headless=new')
        driver = webdriver.Chrome()

        try:
            driver.get(self.url)
            
            for element in elementsToClickOnInit:
                driver.find_element(By.ID, element).click()
                time.sleep(1)

            html = driver.page_source
            return html
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            driver.quit()

    def find_attributes(self, tag, attributeToCheck, substring, attributeToOutput):
        if not self.html_code:
            return []


        soup = BeautifulSoup(self.html_code, 'html.parser')
        
        links = []
        for t in soup.find_all(tag):
            if t.has_key(attributeToCheck) and substring in t[attributeToCheck]:
                links.append(t[attributeToOutput])
        
        return links
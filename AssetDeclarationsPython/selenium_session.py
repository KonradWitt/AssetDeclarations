import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote import webelement
from typing import cast


class SeleniumSession:
    def __init__(self, url: str):
        self.url = url

    def __enter__(self):
        self.driver = webdriver.Chrome()
        self.driver.get(self.url)
        return self

    def __exit__(self, exception_type, exception_val, trace):
        self.driver.quit()
        return True

    def get_text_from_element_by_xpath(self, xpath: str) -> str:
        return self.driver.find_element(By.XPATH, xpath).text

    def click_element_by_xpath(self, xpath: str):
        self.driver.find_element(By.XPATH, xpath).click()
        time.sleep(1)
        return

    def click_element_by_id(self, id: str):
        self.driver.find_element(By.ID, id).click()
        time.sleep(1)
        return

    def get_attribute_from_element_by_xpath(self, xpath: str, attribute: str):
        return self.driver.find_element(By.XPATH, xpath).get_attribute(attribute)

    def get_links_by_child_class(self, childClass: str,):
        tags = self.driver.find_elements(By.CLASS_NAME, childClass)
        links = []
        for t in tags:
            parent = t.find_element(By.XPATH, "..")
            link = parent.get_attribute('href')
            links.append(link)
        return links

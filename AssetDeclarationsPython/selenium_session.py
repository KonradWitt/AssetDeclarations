import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote import webelement
from selenium.common.exceptions import NoSuchElementException

from typing import cast


class SeleniumSession:
    def __init__(self, url: str, download_directory=''):
        self.__url = url
        self.__download_directory = download_directory

    def __enter__(self):
        options = Options()
        options.add_experimental_option('prefs', {
            "download.default_directory": self.__download_directory,
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "profile.default_content_settings.popups": 0,
            "plugins.always_open_pdf_externally": True,
        })
        self.__driver = webdriver.Chrome(options=options)
        self.__driver.get(self.__url)
        return self

    def __exit__(self, exception_type, exception_val, trace):
        self.__driver.quit()
        return True

    def get_text_from_element_by_xpath(self, xpath: str) -> str:
        try:
            return self.__driver.find_element(By.XPATH, xpath).text
        except Exception as e:
            print(f'element with xpath {xpath} was not found')
            return ''

    def click_element_by_xpath(self, xpath: str):
        try:
            self.__driver.find_element(By.XPATH, xpath).click()
            time.sleep(1)

        except Exception as e:
            print(f'element with xpath {xpath} was not found')

    def click_element_by_id(self, id: str):
        try:
            self.__driver.find_element(By.ID, id).click()
            time.sleep(1)
        except Exception as e:
            print(f"Element with ID '{id}' was not found.")

    def get_attribute_from_element_by_xpath(self, xpath: str, attribute: str):
        try:
            return self.__driver.find_element(By.XPATH, xpath).get_attribute(attribute)
        except Exception as e:
            print(f"Exception occured")
            return ''

    def get_links_by_child_class(self, childClass: str,):
        tags = self.__driver.find_elements(By.CLASS_NAME, childClass)
        links = []
        for t in tags:
            parent = t.find_element(By.XPATH, "..")
            link = parent.get_attribute('href')
            links.append(link)
        return links

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote import webelement
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
        return self.__driver.find_element(By.XPATH, xpath).text

    def click_element_by_xpath(self, xpath: str):
        self.__driver.find_element(By.XPATH, xpath).click()
        time.sleep(1)
        return

    def click_element_by_id(self, id: str):
        self.__driver.find_element(By.ID, id).click()
        time.sleep(1)
        return

    def get_attribute_from_element_by_xpath(self, xpath: str, attribute: str):
        return self.__driver.find_element(By.XPATH, xpath).get_attribute(attribute)

    def get_links_by_child_class(self, childClass: str,):
        tags = self.__driver.find_elements(By.CLASS_NAME, childClass)
        links = []
        for t in tags:
            parent = t.find_element(By.XPATH, "..")
            link = parent.get_attribute('href')
            links.append(link)
        return links

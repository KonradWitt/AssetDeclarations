import csv
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium_session import SeleniumSession

linksUrl = 'https://www.sejm.gov.pl/Sejm10.nsf/poslowie.xsp?type=A'
links = []
with SeleniumSession(linksUrl) as session:
    links = (session.get_links_by_child_class('deputyName'))

links =['https://www.sejm.gov.pl/Sejm10.nsf/posel.xsp?id=459&type=A']
timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
filename = 'output' + timestamp + '.csv'
with open(filename, 'w', newline='', encoding='utf8') as csvfile:
    writer = csv.writer(csvfile, delimiter=';',
                        quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for link in links:
        with SeleniumSession(link) as session:
            session.click_element_by_id('osw')

            deputyNameXPath = '//*[@id="title_content"]/h1'
            deputyName = session.get_text_from_element_by_xpath(
                deputyNameXPath)
            print(deputyName)

            imgXpath = '//*[@id="view:_id1:_id2:facetMain:_id108:_id110"]'
            imgUrl = session.get_attribute_from_element_by_xpath(
                imgXpath, 'src')
            if not imgUrl:
                imgUrl = 'err'
            print(imgUrl)

            pdfXpath = '//*[@id="view:_id1:_id2:facetMain:_id191:_id258:1:_id263"]'
            pdfUrl = session.get_attribute_from_element_by_xpath(
                pdfXpath, 'href')
            if not pdfUrl:
                pdfUrl = 'err'
            print(pdfUrl)

            writer.writerow([deputyName, pdfUrl, imgUrl])
            csvfile.flush()
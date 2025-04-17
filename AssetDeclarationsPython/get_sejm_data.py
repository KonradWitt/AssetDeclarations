import csv
from datetime import datetime
import glob
import os
import shutil
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium_session import SeleniumSession

linksUrl = 'https://www.sejm.gov.pl/Sejm10.nsf/poslowie.xsp?type=A'
links = []
with SeleniumSession(linksUrl) as session:
    links = (session.get_links_by_child_class('deputyName'))

index = 0
for link in links:
    repeat = True
    repeatcount = 0
    while repeat:
        repeat = True

        with SeleniumSession(link) as session:
            session.click_element_by_id('osw')

            deputyNameXPath = '//*[@id="title_content"]/h1'
            deputyName = session.get_text_from_element_by_xpath(
                deputyNameXPath)
            print(deputyName)

            directory = fr'C:\Users\wittk\source\repos\AssetDeclarations\AssetDeclarationsPython\downloads\{deputyName}'
            if os.path.exists(directory):
                shutil.rmtree(directory)
            if not os.path.exists(directory):
                os.makedirs(directory)
            with open(directory + r'\output.csv', 'w', newline='', encoding='utf8') as csvfile:
                writer = csv.writer(csvfile, delimiter=';',
                                    quotechar='|', quoting=csv.QUOTE_MINIMAL)
                pdfUrl = ''

                imgXpath = '//*[@id="view:_id1:_id2:facetMain:_id108:_id110"]'
                imgUrl = session.get_attribute_from_element_by_xpath(
                    imgXpath, 'src')
                if not imgUrl:
                    imgUrl = 'err'
                # print(imgUrl)

                pdfXpath = '//*[@id="view:_id1:_id2:facetMain:_id191:_id258:1:_id263"]'
                pdfUrl = session.get_attribute_from_element_by_xpath(
                    pdfXpath, 'href')
                if not pdfUrl:
                    pdfUrl = 'err'
                # print(pdfUrl)
                
                partyXPath = '//*[@id="view:_id1:_id2:facetMain:_id108:klub"]'
                party = session.get_text_from_element_by_xpath(partyXPath)
                #print(party)

                writer.writerow([deputyName, party, pdfUrl, imgUrl])
                if (pdfUrl != 'err'):
                    with SeleniumSession(pdfUrl, directory) as session:
                        time.sleep(5)
                        session.click_element_by_id('download')

                csv_files = glob.glob(os.path.join(directory, "*.csv"))
                pdf_files = glob.glob(os.path.join(directory, "*.pdf"))

                if (len(csv_files) == 1 and len(pdf_files) == 1):
                    print("Files download succesfull")
                    repeatcount = 0
                    repeat = False
                elif (repeatcount < 5):
                    print(f"Files download failed, repear count {repeatcount}")
                    repeatcount = repeatcount + 1
                    repeat = True
                else:
                    print("Files download failed, max count reached")
                    repeatcount = 0
                    repeat = False

from gemini_wrapper import GeminiWrapper
from html_scrapper import HtmlScrapper;


g = GeminiWrapper();
g.test();

h = HtmlScrapper('https://www.sejm.gov.pl/Sejm10.nsf/poslowie.xsp?type=A', [])
relative_links = h.find_attributes('a', 'id', 'lnkPosel', 'href')
full_links = ['https://www.sejm.gov.pl' + link for link in relative_links]
#print(full_links)

h = HtmlScrapper(full_links[0], ['osw'])
imgUrl = h.find_attributes('img', 'id', 'facetMain', 'src')
pdfUrl = h.find_attributes('a', 'title', 'I rok kadencji', 'href')

    
print(imgUrl)
print(pdfUrl)
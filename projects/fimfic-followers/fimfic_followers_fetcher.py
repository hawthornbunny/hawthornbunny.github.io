import datetime, json, os.path, sys, time
import requests
from bs4 import BeautifulSoup
from general import print_stderr

class FimficFollowersFetcher:
    def __init__(self):
        self.config = {
            'base_url': 'https://www.fimfiction.net',
        }

        self.session = requests.Session()

    def fetch_page(self, url):
        print_stderr('Requesting data from {}...'.format(url))
        response = self.session.get(url)
        return response.text

    def get_followers(self, user_name):
        data = {}
        data['followers'] = []

        user_page_url = '{}/user/{}'.format(self.config['base_url'], user_name.replace(' ', '+'))
        data['user'] = self.get_data_from_user_page(user_page_url);
        
        user_page_html = self.fetch_page(user_page_url)

        soup = BeautifulSoup(user_page_html, 'html.parser')
        followers_page_url = '{}{}'.format(self.config['base_url'], soup.find(class_='tab-followers').find('a')['href'])

        while True:
            data['followers'].extend(self.get_followers_data_from_page(followers_page_url))
            followers_page_html = self.fetch_page(followers_page_url)

            soup = BeautifulSoup(followers_page_html, 'html.parser')
            next_followers_page_li = soup.find('div', class_='page_list').find('ul').find_all('li')[-1]
            if next_followers_page_li.has_attr('class') and next_followers_page_li['class'][0] == 'selected':
                break
            
            followers_page_url = '{}{}'.format(self.config['base_url'], next_followers_page_li.find('a')['href'])

        data['followers'].reverse()

        return data

    def get_followers_data_from_page(self, followers_page_url):
        followers_data = []

        followers_page_html = self.fetch_page(followers_page_url)
        soup = BeautifulSoup(followers_page_html, 'html.parser')
        user_card_list = soup.find('ul', class_='user-card-list')
        user_card_divs = user_card_list.find_all('div', class_='user-card')

        for user_card_div in user_card_divs:
            follower_data = {}
            card_content_div = user_card_div.find('div', class_='card-content')
            follower_page_url = '{}{}'.format(self.config['base_url'], card_content_div.find('a')['href'])
            followers_data.append(self.get_data_from_user_page(follower_page_url))

        return followers_data
            
    def get_data_from_user_page(self, user_page_url):
        data = {}
        user_page_html = self.fetch_page(user_page_url)
        soup = BeautifulSoup(user_page_html, 'html.parser')
        user_name_link = soup.find('div', class_='info-container').find('h1').find('a')
        data['url'] = '{}{}'.format(self.config['base_url'], user_name_link['href'])
        data['name'] = user_name_link.get_text()
        mini_info_box = soup.find('ul', class_='mini-info-box')
        data['date_joined'] = self.convert_date_short(mini_info_box.find_all('li')[0].find('b').get_text())
        online_status_span = mini_info_box.find('span', class_='online')
        if online_status_span:
            data['date_last_online'] = datetime.date.today().strftime('%Y-%m-%d %H:%M:%S')
        else:
            data['date_last_online'] = self.convert_date_long(mini_info_box.find_all('li')[1].find_all('span')[1]['title'])
        return data

    # Convert a date in the form "21st Sep, 2017" to ISO 8601 datetime format.
    def convert_date_short(self, date):
        date_pieces = date.split()
        year = date_pieces[2]
        months_dict = {
            'Jan': 1,
            'Feb': 2,
            'Mar': 3,
            'Apr': 4,
            'May': 5,
            'Jun': 6,
            'Jul': 7,
            'Aug': 8,
            'Sep': 9,
            'Oct': 10,
            'Nov': 11,
            'Dec': 12,
        }

        month = months_dict[date_pieces[1][:-1]]
        day = date_pieces[0][0:-2]

        return '{}-{:02d}-{:02d} 00:00:00'.format(year, int(month), int(day))

    # Convert a date in the form "Thursday 21st of September 2017 @12:38pm" to ISO 8601 datetime format.
    def convert_date_long(self, date):
        date_pieces = date.split()
        year = date_pieces[4]
        months_dict = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12,
        }

        month = months_dict[date_pieces[3]]
        day = date_pieces[1][0:-2]

        time_pieces = date_pieces[5].split(':')

        hour = time_pieces[0][1:]
        minute = time_pieces[1][:-2]
        meridian = time_pieces[1][-2:]
        if meridian == 'pm' and int(hour) < 12:
            hour = int(hour) + 12
        return '{}-{:02d}-{:02d} {:02d}:{}:00'.format(year, int(month), int(day), int(hour), minute)

if len(sys.argv) == 2:
    user_name = sys.argv[1]
else:
    print('python {} FIMFICTION_USER_NAME'.format(sys.argv[0]))
    sys.exit()
fetcher = FimficFollowersFetcher()
followers = fetcher.get_followers(user_name)
sys.stdout.write(json.dumps(followers))

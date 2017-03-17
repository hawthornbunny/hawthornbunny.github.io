# Class for fetching URLs from Fimfiction. It must be initialized with the path to a writable cache directory, which
# will store any pages that it fetches (and expire them after 1 day).
import requests
from general import print_stderr
from data_cacher import DataCacher

class UrlFetcher:
    def __init__(self, cache_dir_path):
        self.data_cacher = DataCacher(cache_dir_path)
        self.cache_expiry_time = 60*60*24
        self.fancy_char_replacements = {'’': '\'', '“': '"', '”': '"'}
    
    # Fetches data for the given URL. A check is first made to see if the URL data has been cached; if it has, the
    # cached version will be used, otherwise an HTTP request will be sent to the URL to retrieve the data. If `force` is
    # `True`, then the cache will be bypassed and an HTTP request will always be made.
    def fetch_url(self, url, force=False, cookie_jar=None):

        if force is False and self.data_cacher.has_cached(url, self.cache_expiry_time):
            cache_file_path = self.data_cacher.get_cache_file_path(url)
            print_stderr('Using cached version of "'+url+'"')
            print_stderr('    ('+cache_file_path+')')
            url_data = self.data_cacher.load(url)
            return url_data
        
        print_stderr('Requesting data from "'+url+'"')

        response = requests.get(url, cookies=cookie_jar)
        response_text = response.text

        response_text = self.replace_fancy_chars(response_text)

        if force is False:
            self.data_cacher.save(url, response_text)
        
        return response_text

    # Replaces "fancy" chars like decorative quotes with more regular versions.
    def replace_fancy_chars(self, string):
        modified_string = string
        for fancy_char in self.fancy_char_replacements:
            if fancy_char not in modified_string:
                continue
            modified_string = modified_string.replace(fancy_char, self.fancy_char_replacements[fancy_char])
        return modified_string
        


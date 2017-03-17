# Class which manages a simple file cache in a single directory.
import hashlib, os.path, time
from general import print_stderr

class DataCacher:
    def __init__(self, cache_dir_path):
        self.cache_dir_path = cache_dir_path
        self.path_separator = '/'

    def save(self, name, data):
        cache_file_path = self.get_cache_file_path(name)
        cache_file = open(cache_file_path, 'w')
        cache_file.write(data)

    def load(self, name):
        if self.has_cached(name):
            cache_file_path = self.get_cache_file_path(name)
            return open(cache_file_path, 'r').read()
        return None

    # Return True if the file with the given name has been cached. If `expiry_age` is given, then this will return False
    # if the file is older than the given expiry age (in seconds).
    def has_cached(self, name, expiry_age=None):
        # If there's no file matching this URL's name, then it hasn't been cached.
        cache_file_path = self.get_cache_file_path(name)

        if os.path.exists(cache_file_path):
            cache_file_mtime = os.path.getmtime(cache_file_path)
            cache_file_age = time.time() - cache_file_mtime
            if expiry_age is not None:
                return cache_file_age < expiry_age
            return True
        return False

    # Return the path of the file that `name` would be cached at.
    def get_cache_file_path(self, name):
        PS = self.path_separator
        cache_file_name = self.get_cache_file_name(name)
        cache_file_path = self.cache_dir_path+PS+cache_file_name
        return cache_file_path

    # Return the name of the file that `name` would be cached as.
    def get_cache_file_name(self, name):
        return hashlib.sha1(name.encode('utf-8')).hexdigest()

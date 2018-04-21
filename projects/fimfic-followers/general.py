import sys

def print_stderr(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)



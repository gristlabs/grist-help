# Syncing Docs to HelpScout

Instructions

1. Place into `.helpscout` file in the checkout:
```
HELPSCOUT_DOCS_API_KEY=<key>
```

2. Run command (from checkout) to build documentation for HelpScout:
```
./env/bin/mkdocs build -c -f hscout/mkdocs.yml
```

3. Run command (from checkout) to sync built documentation to HelpScout:

```
env $(cat .helpscout) ./env/bin/python hscout/push_to_helpscout.py
```


## Python Requirements

The script relies on the following packages (exact versions are unlikely to matter):

- beautifulsoup4==4.10.0
- requests==2.26.0

To build docs with tweaked options, it uses the INHERIT feature of mkdocs, supported in

- mkdocs==1.2.3

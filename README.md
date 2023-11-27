![](./stuff/img.png)
![](./stuff/img_3.png)

> Join our discord server: [join now](https://discord.gg/nqqrabWN)

# Obsidian Open Gate

This plugin allows you to embedding any website to Obsidian, you have anything you need in one place. You can browse website and take notes at the same time. e.g. Ask ChatGPT and copy the answer directly to your note.

## Features

-   Embed any website in your Obsidian
-   Auto generate icon
-   Embed any site that can not be embedded by iframe: Google Translate
-   Support for mobile
-   Custom CSS

## Usage

1.  just type `New gate` in command palette
1.  type the url and title of the site you want to embed
1.  click `Create`

Then you will the the icon of then website in the left sidebar.

### Options

![](./stuff/img_1.png)

Custom CSS

![](./stuff/img_5.png)

### Add new Gate

![](./stuff/img_2.png)

Add new gate does not require to restart Obsidian. But editing and deleting gate requires to restart Obsidian.

### Use Code block

You can use a code block with the language set to `gate` to embed any website directly within a note, including custom css.

````markdown
```gate
https://12bit.vn
height: 300
css: |
   html { filter: invert(90%) hue-rotate(180deg)!important; }
```
````

```markdown
This is 12bit, but logged-in with account 1

![height:800px;profile:account-1](https://12bit.vn?open-gate=true)

This is 12bit, but logged-in with account 2

![height:800px;profile:account-2](https://12bit.vn?open-gate=true)
```

### Quick switcher

You can quickly open gates using a single shortcut. The default is `Ctrl+Shift+G` or `Cmd+Shift+G`. You can change it in the Hotkeys section of Obsidian.

![](./stuff/img_4.png)

## Deployment

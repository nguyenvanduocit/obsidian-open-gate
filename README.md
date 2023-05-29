![](./stuff/img.png)
![](./stuff/img_3.png)

# Obsidian Open Gate

This plugin allows you to embedding any website to Obsidian, you have anything you need in one place. You can browse website and take notes at the same time. e.g. Ask ChatGPT and copy the answer directly to your note.

## Features

-   Embed any website in your Obsidian
-   Auto generate icon
-   Embed any site that can not be embedded by iframe: Google Translate
-   Support for mobile

## Usage

1.  just type `New gate` in command palette
1.  type the url and title of the site you want to embed
1.  click `Create`

Then you will the the icon of then website in the left sidebar.


### Options

![](./stuff/img_1.png)

### Add new Gate

![](./stuff/img_2.png)

Add new gate does not require to restart Obsidian. But editing and deleting gate requires to restart Obsidian.

### Use Code block

You can use code

You can use code block to embed any website.

~~~markdown
```gate  
https://12bit.vn
height:300
```
~~~

### Use link

You can use link to embed any website.

~~~markdown
![height:800px](https://12bit.vn)
~~~

In this syntax, you can add `height:800px` to change the height of the gate. To set profile you set `profile:profile_name`.

~~~markdown
This is 12bit, but logged-in with account 1

![height:800px;profile:account-1](https://12bit.vn)

This is 12bit, but logged-in with account 2

![height:800px;profile:account-2](https://12bit.vn)
~~~

### Quick switcher

You can quickly open gates using a single shortcut. The default is `Ctrl+Shift+G` or `Cmd+Shift+G`. You can change it in the Hotkeys section of Obsidian.

![](./stuff/img_4.png)

## Embedding Grist

Perhaps you'd like to list your product, prices and quantities on your website,
or you want to display a pie chart of voting results that updates live. With
[public access](sharing.md#public-access-and-link-sharing) turned on, you may embed your
Grist document on your own site.

To do that, you first need to make it [public](sharing.md#public-access-and-link-sharing) and have
access to your website's code in order to place some HTML code in the desired location.

If your site is hosted on some popular cloud CMS platform (like Blogger or WordPress),
you may find HTML code blocks in your theme editor, or may need to use a
[plugin](https://wordpress.org/plugins/wp-coder/) to access your site's code.
If you have any problems editing your site, feel free to ask us or post a question
on our [Community Forum](https://community.getgrist.com/).

Once you have decided where to embed your document, paste this code snippet in your HTML file:

```html
<iframe src="https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true" 
        height="250px" width="100%" frameborder="0">
</iframe>
```

The `src` attribute points to the URL of the page you want to embed. To get the `URL`
for your document, simply navigate to the page you want to share and
copy the URL from the browser's address bar. Appending the `?embed=true` parameter at the end
tells Grist that it should show only the content of your page, removing any elements that
are not necessary for the embedded version. You may wish to adjust `height` and `width` attributes
to make it look better on your site.

Since this Help Center document is a regular HTML file, we can try it right away!
Below you should be able to see an embedded live table (not a screenshot) from one of our
[examples](https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6):

<iframe src="https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=light&themeSyncWithOs=false" 
        height="250px" width="100%" frameborder="0">
</iframe>

This is a live, read-only view of the Grist page and it gets updated as soon as 
someone edits it. You can, of course, embed any page you wish, including card view, charts
and any page with multiple sections.

Here are two more examples with a chart and a card list view:

<iframe src="https://public.getgrist.com/42dAvZXMFewH/Funding-Pipeline/p/13?embed=true&themeAppearance=light&themeSyncWithOs=false" 
        height="300px" width="100%" frameborder="0">
</iframe>

<iframe src="https://templates.getgrist.com/ihsZTnKTF7Lr/Treasure-Hunt/p/3?embed=true&themeAppearance=light&themeSyncWithOs=false" 
        height="300px" width="100%" frameborder="0">
</iframe>

## Parameters

#### Read-Only vs. Editable

Appending a URL with `?embed=true` shares the page as read-only while `?style=singlePage` can be edited and follows [access rules](access-rules.md).

!!! note "Sharing an Embedded Style View"
    Adding `?embed=true` or `?style=singlePage` to the end of a document's page URL renders the document without the toolbar on top, the page menu on the left or creator panel on the right. To learn more about link sharing, see [Public access and link sharing](sharing.md#public-access-and-link-sharing).

#### Appearance

Control how an embedded iframe appears by assigning a theme appearance by appending `?themeAppearance=light` for light mode or `?themeAppearance=dark` for dark mode to your URL.

You can also override the operating system's default using `?themeSyncWithOs=false`.

!!! note "Chaining Parameters"
    When adding parameters to the end of your URL, the first always leads with `?`. Any additional parameters lead with `&`. For example, [https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=dark&themeSyncWithOs=false](https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=dark&themeSyncWithOs=false) creates an embedded-style, read-only view and forces dark mode, regardless of your OS settings.



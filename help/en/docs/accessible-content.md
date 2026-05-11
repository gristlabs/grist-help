---
title: "Creating accessible Grist documents"
---

This page is about how to author accessible Grist documents. If you are interested in how to use Grist if you have disabilities, see the [Accessibility: using Grist](accessibility.md) page.

## What are accessible documents?

A good practice to keep in mind when authoring content online is to make sure _everyone_ can perceive and understand it, whatever their disabilities.

For example, that means considering the deaf and writing a text transcription or subtitles when making a video. Or considering the blind and providing text descriptions of your images that can be read by speech synthesis tools.

That is what we mean when we talk about accessibility.

In Grist, there are a few considerations we can make to create accessible documents.

## Colors

You can apply any color you want to column headers and cells, specifying both background and text color.

Here are examples of how colors can be perceived by people with different color blindnesses or low contrast sensitivity:

<div id="glider1" class="glider-contain" style="max-width: 500px">
  <div class="glider">
    <figure>
      <img src="../images/accessibility/grist-colors.png" alt="A Grist grid with some green, blue, red and orange cells">
      <figcaption>1. True colors</figcaption>
    </figure>
    <figure>
      <img src="../images/accessibility/grist-colors-protanopia.png" alt="The same grid, with colors perceived as yellow, blue, gray and yellow">
      <figcaption>2. With protanopia (lack of red)</figcaption>
    </figure>
    <figure>
      <img src="../images/accessibility/grist-colors-tritanopia.png" alt="The same grid, with colors perceived as blue, blue, red and red">
      <figcaption>3. With tritanopia (lack of blue)</figcaption>
    </figure>
    <figure>
      <img src="../images/accessibility/grist-colors-achromatopsia.png" alt="The same grid, with colors perceived as shades of gray">
      <figcaption>4. With achromatopsia (lack of all colors)</figcaption>
    </figure>
    <figure>
      <img src="../images/accessibility/grist-colors-contrast-loss.png" alt="The same grid with a semi-transparent gray overlay on top of it">
      <figcaption>5. With low contrast sensitivity</figcaption>
    </figure>
  </div>

  <button class="glider-prev" aria-label="Previous theme slide">«</button>
  <button class="glider-next" aria-label="Next theme slide">»</button>
  <div role="tablist" class="dots"></div>
</div>

With these examples, we realize that:

- **High contrast** between colors is important. In multiple pictures, the first column content is hard or very hard to read. When in doubt, use a [color contrast checker](https://coolors.co/contrast-checker).
- **Avoid using color alone to convey information**. The third column, which has only green or red cells to show if the line is "valid", is not enough. In multiple pictures, we cannot understand whether the color means "valid" or "invalid". The fourth column adds a _check_ icon in the cell in addition to the color, making it accessible: even if I can't perceive the color, I can see the checkmark.

!!! note "Tip"
    When specifying column header colors or cell colors, we advise on always choosing a pair of background + text color, and not only a background color or only a text color. This makes sure your choices are always applied, whatever the theme people use to read your document (light theme, dark theme or high contrast theme).

## Images

As soon as you insert images in your content, you should think of the blind and those with low vision. If I'm blind, I use an additional tool to understand content, like a _screen reader_: it vocalizes, with speech synthesis, the content of the page. Tools like that can read text without issue, but can't guess what your images mean.

In Grist, you can include images thanks to Markdown support in forms or text cells. Be sure to use the `![alt text](image url)` syntax. The "alt text" is what screen readers read aloud for people to understand the image.

To choose a good alt text, try to remove the image: what visible text would you write instead? In the example below, "Grist" is the correct alt to use. Not "Blue, yellow and gray logo with Grist next to it", not "Grist logo". It's "Grist", because without the image, you would say "What do you think about Grist?".

![Text alternative example: text line with 'What do you think about' written, plus the Grist logo included in the sentence, replacing actual text'](images/accessibility/grist-image-alt.png)

## Forms

### Page title

When publishing a form, watch out for the form page title. You can edit it by changing the "widget title" in the form configuration:

![Grist form configuration screenshot](images/accessibility/grist-form-title.png)

This title is used as the form page title in the browser. This title is very important for people using assistive technologies like screen readers to understand which page they are on.

![Grist form page title in browser screenshot](images/accessibility/grist-form-title-2.png)
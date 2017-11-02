A visualization library for thumbnail content. Go to the [Project Page](http://justinsa.github.io/card-ui-visualization) for a demonstration of the available behaviors.

##Dependencies

See [Project Page](http://justinsa.github.io/card-ui-visualization)

##Basic Setup

1. Add this script to your application:

```HTML
<script type="text/javascript" src="./assets/scripts/card-ui-visualizations.js"></script>
```

2. Add this stylesheet:

```HTML
<link rel="stylesheet" href="./assets/styles/card-ui-visualizations.css">
```

##Configuration Options

Under construction

##Basic Usage

###Card Blocks

```JAVASCRIPT
$('.card-block').each(function() { window['card-ui-visualizations']['card-block'](this); });
```

###Card Rings

```JAVASCRIPT
$('.card-ring').each(function() { window['card-ui-visualizations']['card-ring'](this); });
```

##Development

After forking you should only have to run ```npm install``` from a command line to get your environment setup.

After install you have two gulp commands available to you:

1. ```gulp js:lint```
2. ```gulp js:test```

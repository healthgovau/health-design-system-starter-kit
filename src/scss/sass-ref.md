Ref https://css-tricks.com/the-sass-ampersand/

.grand-parent {
.parent {
@at-root .child {}
}
}

.child {}

.button {
body.page-about & { }
}

body.page-about .button {}

.parent {
&#{&} {

}
}
.parent.parent {}

Ref https://css-tricks.com/using-sass-control-scope-bem-naming/

.component {
$self: &; // Hey look, it's our new best friend!
display: block;
max-width: 30rem;
min-height: 30rem;
// Other styles redacted

    &--reversed {
      background: white;
      border-color: lightgray;

      // Here, we use $self to get the correct scope
      #{ $self }__child-element {
        background: rebeccapurple;
      }
    }

}

.component--reversed .component\_\_child-element

# Fix modifier syntax

## For <div class="health-hero health-hero--dark">

.health-hero {
color: white;
&#{&}--dark {
color: black;
}
}

## To produce:

.health-hero {color: white}
.health-hero.health-hero--dark {color: black}

# Dark classes

## In HDS:

## top level

.au-body.au-body--dark {
background: $AU-colordark-background;
}

## modifiers

.au-introduction {
@include health-fontgrid( lg , default, light);
color: $colour-minorText;

    &--dark {
      color: $AU-color-foreground-text;
    }

}

## children

&--dark {
background-color: $header-bg-colour--dark;
background: $header-bg-gradient--dark;

    a {
      color: $AU-colordark-foreground-text;
      &:hover {
        color: $AU-colordark-foreground-text;
        text-decoration: none;
      }
    }

}

## Health variations on UIKit call to action link.

.au-body {
.au-cta-link {
// Right align the link.
&--right {
text-align: right;
}
}

// We want to apply the dark theme automatically to the link if it within au-body--dark.
&.au-body--dark .au-cta-link {
@extend .au-cta-link--dark;
}
}

## Ghost class

%sub-brand--dark {
h1, p, .au-introduction {
color: #FFF;
}
a {
color: #fff;
}
.health-toolbar {
.au-btn.au-btn--tertiary {
color: #fff;
&:hover:not(:disabled) {
color: #fff;
}
}
}
}

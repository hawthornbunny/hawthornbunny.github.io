# hyaseq - simple text-based chiptune sequencer

## Overview
hyaseq is a chiptune sequencer created by me (hyasynth) as an experiment in music programming. It's designed to be simple and quick to use, providing reasonable defaults but allowing enough flexibility to create decent tunes.

hyaseq was inspired by [BeepBox](https://www.beepbox.co) and [Bytebeat](https://dollchan.net/bytebeat).

## Features
* Pulse and noise oscillators
* Variable-rate pulse width modulation
* Variable note cutoff (long, medium, and short notes)
* Variable note volume (loud, medium, quiet)
* Implicit ordering when no orders are defined
* Implicit padding of incomplete sequences or orders

## Usage
To create music with hyaseq, write a hyaseq script in the input textbox.

A hyaseq script is a list of _commands_. A _command_ is an instruction (eg. `seq`, `order`) followed by a colon (`:`), followed by a list of space-separated parameters. Lines beginning with `#` are ignored and can be used as comments.

## Commands
hyaseq has only 3 commands:

* `tempo: N`: Set the song's tempo to the value of N, in bpm (beats per minute). If omitted, the tempo defaults to 150.
* `seq: NOTE_1 NOTE_2 NOTE_3` ... : Define a sequence of notes of any length. The script must have at least 1 sequence in order to produce audio output.
* `order: SEQ_A SEQ_B SEQ_C` ... : Define an order of any length, where each parameter is the numeric index of a previously-defined sequence, or a rest (a sequence of `-` characters). If omitted, hyaseq uses implicit ordering (see the ''Implicit ordering'' section).

## Terms
* _Beat_: A unit of time, defined by the song's tempo (in beats per minute). The song is made up of a whole number of beats. Notes are triggered on the start of each beat.
* _Bar_: A number of beats. The bar length is not defined explicitly; it is equal to the length of the longest fully-defined sequence in the song.
* _Note_: A single unit of pitch/noise information, which tells the synthesizer what sound to produce. All notes occupy exactly one beat of the song. Notes have 4 properties: note name (A, B, C, C#, etc.), octave (0 to 9), note cutoff (full note, half note, short note), and modulation (0 to 9).
* _Sequence_: An ordered list of notes. Each sequence is one bar long. Sequences are automatically assigned a numeric index: the first-defined sequence in the script is index 1, the second is index 2, and so on.
* _Order_: An ordered list of sequence indices. Each order represents a "track" of the song, such that when the song is played, all orders play simultaneously. By arranging sequences in orders, the user can build up a song out of reusable parts. The length of the song is the number of bars in the longest fully-defined order.
 
## Note syntax
Musical notes are specified using a compact 3-character syntax:

* Character 1: **Note name** - One of `c`, `C`, `d`, `D`, `e`, `f`, `F`, `g`, `G`, `a`, `A`, `b`, or `n` for noise. Uppercase note names are sharps; for example, `F` means F#, while `f` means F.
* Character 2: **Octave/cutoff** - If the character is one of `0` to `9`, this selects the octave for a medium-length note. To get long notes, replace the character with a corresponding letter from the range `A` to `J`, where `A` maps to `0` and `J` maps to `9`. For short notes, instead use a lowercase letter from the range `a` to `j`.
* Character 3: **Modulation/volume** - If the character is one of `0` to `9`, this selects the pulse width modulation for a medium-volume note, where `0` is no modulation and `9` is rapid modulation. To get loud notes, replace the character with a corresponding letter from the range `A` to `J`, where `A` maps to 0 and `J` maps to `9`. For quiet notes, instead use a lowercase letter from the range `a` to `j`. If the character is `0`, it can be omitted.

To specify a rest (ie. no note played), use `---` or `--`.

### Examples
Medium-length, medium-volume middle C with no modulation:

    c40

Since the third character in the above example is 0, it can be omitted, allowing the same note to be specified as:

    c4

Medium-length D in octave 3 with no modulation:

    d3

Medium-length D# in octave 5 with no modulation:

    D5

Short-length G in octave 1 with no modulation. Note that to get a short note, we replace the octave numeral (`1`) with the corresponding lowercase letter (`b`):

    gb

Long-length A# in octave 5 with modulation level 1. Note that to get a long note, we replace the octave numeral (`5`) with the corresponding uppercase letter (`F`).

    AF1

Long, quiet B note in octave 4 with modulation level 2. Note that since this note is quiet, we replace the modulation numeral (`2`) with the corresponding lowercase letter (`c`).

    bEc

Short, loud noise in octave 3. For noise notes, modulation doesn't have much effect, so here it's set to 0 (indicated by `A`), but you can use higher modulations if you want.

    ndA

Rest:

    ---

Also a rest:

    --

## Implicit ordering
To allow for quick prototyping, hyaseq allows the user to get away with not specifying any orders. If no orders are specified, hyaseq will pretend that each currently defined sequence constitutes its own "order" of length 1, and they will be played concurrently.

## Implicit padding
To allow for faster and easier song creation, hyaseq allows the user to get away with not specifying every note in a sequence. Instead, if the user defines a sequence that is shorter than a bar, hyaseq will pad the sequence to the full length of the bar by repeating the notes already there.

For example, if the bar length is 8 beats, and the user defines a sequence like this:

    seq: c1 d1 e1

hyaseq will automatically interpret the sequence as this:

    seq: c1 d1 e1 c1 d1 e1 c1 d1

This allows the user to simplify bars that contain repetitive information, which is useful for things like drum beats.

hyaseq will also pad orders in the same way: if you have an order that is shorter than the song, hyaseq will loop the sequences in the order to fill the song. For example, if the song is 6 bars long, then the following order:

    order: 1 2

will be padded to this:

    order: 1 2 1 2 1 2

This makes it easier to craft songs that have repetitions in their structure.

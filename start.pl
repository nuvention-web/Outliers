#!/usr/bin/perl -w 

use warnings;

my $mystring = "this is some text form the journal of wallstreet journal one on thing";

my $lister = chomp($mystring);

print "\n\n$lister\n\n";



if($mystring =~ /some/){

print "yes it is in";

}else{

print"nope there aren't any";

}
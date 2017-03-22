package isab.workshop;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Regex {

   static final String msg = "he renders the help when he sees her";

   public static void main(String[] args) {
      matchSamples();
      replaceSamples();
      splitSamples();
      compileRegex();
   }

   public static void matchSamples() {
      evalMatches(msg, "\\bhelp\\b");
      evalMatches(msg, ".*\\bhelp\\b.*");
      evalMatches(msg, "he");
      evalMatches(msg, "he.*");
   }

   public static void evalMatches(String msg, String re) {
      if (msg.matches(re)) {
         System.out.printf("TRUE:  Regex [%s] matches [%s].\n", re, msg);
      } else {
         System.out.printf("FALSE: Regex [%s] matches [%s].\n", re, msg);
      }
   }
   
   public static void replaceSamples() {
      String newMsg = msg.replaceAll("he", "Bob");
      System.out.println(newMsg);
      newMsg = msg.replaceAll("\\bhe\\b", "Bob");
      System.out.println(newMsg);
   }
   
   public static void splitSamples() {
      System.out.println(msg);
      splitIntoPieces(" ");
      splitIntoPieces("\\b");
      splitIntoPieces("he");
      splitIntoPieces(" he ");
      splitIntoPieces("\\s*\\bhe\\b\\s*");
   }
   
   public static void splitIntoPieces(String regex) {
      System.out.printf("Regex = \"%s\"\n", regex);
      String[] pieces = msg.split(regex);
      for (String piece : pieces) {
         System.out.printf("[%s] ", piece);
      }
      System.out.println();
   }
   
   public static void compileRegex() {
      Pattern p = Pattern.compile("he (\\w+).*he (\\w+)");
      Matcher m = p.matcher(msg);
      if (m.find()) {
         for (int i = 0; i <= m.groupCount(); i++) {
            System.out.printf("Group %d = %s\n", i, m.group(i));
         } 
      }
   }

}

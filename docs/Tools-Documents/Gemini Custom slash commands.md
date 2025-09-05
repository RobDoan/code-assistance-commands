# **Gemini CLI: Custom slash commands**

Custom slash commands in Gemini CLI allow you to create reusable, parameterizable prompts to streamline your workflows. You can define these commands in .toml files without needing to be a programmer.

## **Creating a custom command**

1. **Choose a scope**:
   * **Global commands**: Store them in \~/.gemini/commands/ to make them available in any project.
   * **Local commands**: Store them in .gemini/commands/ within your project folder for project-specific commands.
2. **Create the command file**:
   * Create a .toml file with the name of your command. For example, plan.toml will create the /plan command.
   * You can create the directory and file with these commands:
     mkdir \-p \~/.gemini/commands
     touch \~/.gemini/commands/plan.toml

3. **Add the command definition**:
   * Open the .toml file and add the content. Here is an example for a /plan command:
     \# \~/.gemini/commands/plan.toml
     description="Investigates and creates a strategic plan to accomplish a task."
     prompt \= """
     Your primary role is that of a strategist, not an implementer.
     Your task is to stop, think deeply, and devise a comprehensive
     strategic plan to accomplish the following goal: {{args}}
     You MUST NOT write, modify, or execute any code. Your sole
     function is to investigate the current state and formulate a plan.
     Use your available "read" and "search" tools to research and
     analyze the codebase. Gather all necessary context before
     presenting your strategy.

     Present your strategic plan in markdown. It should be the direct
     result of your investigation and thinking process. Structure your
     response with the following sections:

     1\. \*\*Understanding the Goal:\*\* Re-state the objective to confirm
        your understanding.
     2\. \*\*Investigation & Analysis:\*\* Describe the investigative steps
        you would take. What files would you need to read? What would
        you search for? What critical questions need to be answered
        before any work begins?
     3\. \*\*Proposed Strategic Approach:\*\* Outline the high-level strategy.
        Break the approach down into logical phases and describe the
        work that should happen in each.
     4\. \*\*Verification Strategy:\*\* Explain how the success of this plan
        would be measured. What should be tested to ensure the goal is
        met without introducing regressions?
     5\. \*\*Anticipated Challenges & Considerations:\*\* Based on your
        analysis, what potential risks, dependencies, or trade-offs
        do you foresee?

     Your final output should be ONLY this strategic plan.
     """

## **Using the command**

Once the command file is saved, you can use it directly in the Gemini CLI:

/plan How can I make the project more performant?

Gemini will then generate a detailed step-by-step execution plan based on the prompt defined in your .toml file.

## **Custom Command Format**

* prompt (String): The custom prompt for the LLM. It can be a single-line or multi-line string.
* description (String): An optional one-line description of what the command does.
* {{args}}: A shorthand to inject arguments from the command line into your prompt.
* \!{...}: To execute shell commands and inject their output.

### **Example with shell commands**

Here's an example of a command that uses a shell command to get the staged changes from git and uses that output to generate a commit message.

\# In: \~/.gemini/commands/git/commit.toml
\# Invoked via: /git:commit
description \= "Generates a Git commit message based on staged changes."
\# The prompt uses \!{ } to execute the command and inject its output.
prompt \= """

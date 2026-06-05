package Backend.model;

import java.util.List;

public class MeetingAnalysisResponse {

    private String summary;
    private List<String> tasks;
    private List<String> decisions;
    private List<String> risks;
    private String mood;

    public MeetingAnalysisResponse(String summary, List<String> tasks, List<String> decisions, List<String> risks, String mood) {
        this.summary = summary;
        this.tasks = tasks;
        this.decisions = decisions;
        this.risks = risks;
        this.mood = mood;
    }

    public String getSummary() {
        return summary;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public List<String> getDecisions() {
        return decisions;
    }

    public List<String> getRisks() {
        return risks;
    }

    public String getMood() {
        return mood;
    }
}
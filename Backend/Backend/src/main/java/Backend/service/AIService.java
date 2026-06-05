package Backend.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AIService {

    public String generateSummary(String transcript) {
        return "AI Summary: The meeting focused on " + transcript;
    }

    public String detectMood(String transcript) {
        if (transcript.toLowerCase().contains("delay") || transcript.toLowerCase().contains("problem")) {
            return "Concerned";
        }
        return "Productive";
    }

    public List<String> extractTasks(String transcript) {
    if (transcript.toLowerCase().contains("finish") || transcript.toLowerCase().contains("complete")) {
        return List.of("Complete assigned work mentioned in the meeting");
    }
    return List.of("Review meeting transcript");
}

public List<String> extractDecisions(String transcript) {
    if (transcript.toLowerCase().contains("decided") || transcript.toLowerCase().contains("use")) {
        return List.of("A technical or project decision was made");
    }
    return List.of("No clear decision detected");
}

public List<String> extractRisks(String transcript) {
    if (transcript.toLowerCase().contains("delay") || transcript.toLowerCase().contains("problem")) {
        return List.of("Possible delay or blocker detected");
    }
    return List.of("No major risk detected");
}
}
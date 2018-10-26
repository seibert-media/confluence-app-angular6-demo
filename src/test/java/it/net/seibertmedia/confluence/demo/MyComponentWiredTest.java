package it.net.seibertmedia.confluence.demo;

import com.atlassian.plugins.osgi.test.AtlassianPluginsTestRunner;
import com.atlassian.sal.api.ApplicationProperties;
import net.seibertmedia.confluence.demo.api.MyPluginComponent;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AtlassianPluginsTestRunner.class)
public class MyComponentWiredTest {

	private final ApplicationProperties applicationProperties;

	private final MyPluginComponent myPluginComponent;

	public MyComponentWiredTest(ApplicationProperties applicationProperties, MyPluginComponent myPluginComponent) {
		this.applicationProperties = applicationProperties;
		this.myPluginComponent = myPluginComponent;
	}

	@Test
	public void testMyName() {
		assertEquals("names do not match!", "myComponent:" + applicationProperties.getDisplayName(), myPluginComponent.getName());
	}
}
